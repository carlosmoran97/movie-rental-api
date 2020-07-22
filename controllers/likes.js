const Like = require('../models/like');
const Movie = require('../models/movie');
const sequelize = require('../config/database');
const { body, validationResult } = require('express-validator');

module.exports = {
    create: async(req, res) => {
        const { movieId } = req.body;
        const userId = req.user.id;
        const t = await sequelize.transaction();
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    error: errors.array().map(error => error.msg)
                });
            }
            const movie = await Movie.findByPk(movieId);
            if(!movie){
                return res.status(404).json({
                    error: 'Movie not found'
                });
            }
            await Like.create({
                MovieId: movieId,
                UserId: userId
            }, { transaction: t });
            await t.commit();
            res.json({
                message: 'success'
            });
        }catch(err) {
            await t.rollback();
            res.status(500).json({
                error: err.message
            });
        }
    },
    validate: (method) => {
        switch(method){
            case 'create_like': {
                return [
                    body('movieId', "Provide movieId").isInt().exists()
                ];
            }
        }
    }
};
