const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');
const redis = require('../config/redis');
const Role = require('../config/role');
const sendMailVerification = require('../helpers/send-email-verification');
const sendRecoveryMail = require('../helpers/send-recovery-mail');
const moment = require('moment');
const crypto = require('crypto-random-string');
const VerificationToken = require('../models/verificationtoken');
const RecoveryToken = require('../models/recoverytoken');

module.exports = {
    // ==========================================================================
    // Provide email and password to generate a token that autenticates the user
    // ==========================================================================
    /**
     * @swagger
     * components:
     *  schemas:
     *    LoginRequestBody:
     *      type: object
     *      required:
     *        - email
     *        - password
     *      properties:
     *        email:
     *          type: string
     *        password:
     *          type: string
     *      example:
     *        email: carlosmoran.97cr@gmail.com
     *        password: admin
     *    LoginResponse:
     *      type: object
     *      properties:
     *        user:
     *          type: object
     *          properties:
     *            id:
     *              type: integer
     *            name:
     *              type: string
     *            email:
     *              type: string
     *              format: email
     *            role:
     *              type: string
     *              enum: [User, Admin]
     *        token:
     *          type: string
     */
    login: async (req, res) => {
        const { email } = req.body;
        try {
            const userBD = await User.findOne({ where: { email } });
            if (!userBD) {
                return res.status(404).json({
                    error: 'User not found.'
                });
            }
            if (!bcrypt.compareSync(req.body.password, userBD.password)) {
                return res.status(400).json({
                    error: 'Wrong email or password.'
                });
            }
            const user = {
                id: userBD.id,
                name: userBD.name,
                email: userBD.email,
                role: userBD.role
            };
            const token = jwt.sign(user, process.env.SECRET, {
                expiresIn: process.env.TOKEN_EXPIRES_IN
            });

            res.json({ user, token });
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },
    logout: async (req, res) => {
        // logout user
        // save token in redis
        try {
            const token = req.headers.authorization.split(' ')[1];
            await redis.LPUSH('token', token);
            return res.status(200).json({
                message: 'You are logged out',
            });
        } catch (err) {
            return res.status(500).json({
                error: err.message,
            });
        }
    },
    /**
     * @swagger
     * components:
     *  schemas:
     *    RegisterRequestBody:
     *      type: object
     *      required:
     *        - name
     *        - email
     *        - password
     *      properties:
     *        name:
     *          type: string
     *        email:
     *          type: string
     *          format: email
     *        password:
     *          type: string
     *          format: password
     */
    register: async (req, res) => {
        const { name, email, password } = req.body;
        const t = await sequelize.transaction();
        try {
            const user = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                role: Role.User,
                isVerified: false
            },{ transaction: t });
            const verificationToken = await VerificationToken.create({
                userId: user.id,
                token: crypto({ length: 16 }),
                expireDate: new Date(moment()
                    .add(parseInt(process.env.TOKEN_HOURS_TO_LIVE), 'hours')
                    .format('YYYY-MM-DD HH:mm:ss')
                )
            }, { transaction: t });
            // Send verification mail
            await sendMailVerification(email, verificationToken.token);
            await t.commit();
            res.json(user);
        } catch (err) {
            console.log(err);
            await t.rollback();
            res.status(500).json({
                error: err.message
            });
        }
    },
    changeRole: async(req, res) => {
        const { id: userId } = req.params;
        const { role } = req.body;
        try {
            if(!Object.values(Role).includes(role)){
                return res.status(422).json({
                    error: `The role "${role}" is not valid`
                });
            }
            const user = await User.findByPk(userId);
            if(!user){
                return res.status(404).json({
                    error: 'User not found'
                });
            }
            await User.update({ role }, { where: { id: userId } });
            res.send({
                message: `User role was updated to "${role}"`
            });
        }catch(err){
            res.status(500).json({
                error: err.message
            });
        }
    },
    confirmEmail: async(req, res) => {
        const { email, token } = req.body;
        try {
            const user = await User.findOne({ where: { email: email } });
            if(!user){
                return res.status(404).json({
                    error: 'User not found'
                });
            }
            if(user.isVerified){
                return res.status(202).json({
                    message: 'Email already verified'
                });
            }
            const verificationToken = await VerificationToken.findOne({
                where: { token: token }
            });
            if(!verificationToken){
                return res.status(404).json({
                    error: 'Token expired'
                });
            }
            if(verificationToken.expireDate < new Date()){
                verificationToken.destroy();
                return res.status(404).json({
                    error: 'Token expired'
                });
            }
            await user.update({
                isVerified: true
            });
            verificationToken.destroy();
            res.json({
                message: `User with ${user.email} has been verified`
            });
        }catch(err){
            res.status(500).json({
                error: err.message
            });
        }
    },
    sendPasswordRecovery: async(req, res) => {
        const { email } = req.params;
        const t = await sequelize.transaction();
        try{
            const user = await User.findOne({ where: { email: email } });
            if(!user){
                return res.status(404).json({
                    error: 'User no found'
                });
            }
            const recoveryToken = await RecoveryToken.create({
                userId: user.id,
                token: crypto({ length: 16 }),
                expireDate: new Date(moment()
                    .add(parseInt(process.env.TOKEN_HOURS_TO_LIVE), 'hours')
                    .format('YYYY-MM-DD HH:mm:ss')
                )
            },{ transaction: t });
            await sendRecoveryMail(email, recoveryToken.token);
            await t.commit();
            res.json({
                message: 'Recovery email has been sent'
            });
        }catch(err){
            await t.rollback();
            res.status(500).json({
                error: err.message
            });
        }
    },
    passwordRecovery: async(req, res) => {
        const { email, token, password } = req.body;
        try {
            const user = await User.findOne({ where: { email: email } });
            if(!user){
                return res.status(404).json({
                    error: 'User not found'
                });
            }
            const recoveryToken = await RecoveryToken.findOne({
                where: { token: token }
            });
            if(!recoveryToken){
                return res.status(404).json({
                    error: 'Token expired'
                });
            }
            if(recoveryToken.expireDate < new Date()){
                recoveryToken.destroy();
                return res.status(404).json({
                    error: 'Token expired'
                });
            }
            await user.update({
                password: bcrypt.hashSync(password, 10)
            });
            recoveryToken.destroy();
            res.json({
                message: `Password of the user with ${user.email} has been changed`
            });
        }catch(err){
            res.status(500).json({
                error: err.message
            });
        }
    },
};