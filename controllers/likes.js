const Like = require('../models/like');
const Movie = require('../models/movie');
const sequelize = require('../config/database');
const { body, validationResult } = require('express-validator');
const errorsResponse = require('../helpers/errors-response');

module.exports = {
    create: async(req, res) => {
        const { movieId } = req.body;
        const userId = req.user.id;
        const t = await sequelize.transaction();
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                await t.rollback();
                return res.status(422).json({
                    error: errorsResponse(errors)
                });
            }
            const movie = await Movie.findByPk(movieId);
            if(!movie){
                await t.rollback();
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
                    body('movieId', "Provide a integer movieId").isInt().exists()
                ];
            }
        }
    }
};
