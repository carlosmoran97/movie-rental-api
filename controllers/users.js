const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('../config/redis');
const Role = require('../config/role');

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
        try {
            const user = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                role: Role.User
            });
            res.json(user);
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },
};