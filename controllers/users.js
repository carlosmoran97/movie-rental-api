const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // ==========================================================================
    // Provide email and password to generate a token that autenticates the user
    // ==========================================================================
    login: async (req, res) => {
        const { email } = req.body;
        try {
            const userBD = await User.findOne({ where: { email } });
            if (!userBD) {
                return res.status(400).json({
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
    logout: async (req, res) => { },
    register: async (req, res) => {
        const { name, email, password, role } = req.body;
        try {
            const user = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                role
            });
            res.json(user);
        }catch(err) {
            res.status(500).json({
                error: err.message
            });
        }
     },
};