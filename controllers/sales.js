const Sale = require('../models/sale');
const SaleLine = require('../models/saleline');
const sequelize = require('../config/database');
const Movie = require('../models/movie');
const salesLog = require('../helpers/sales-log');
const { body, validationResult } = require('express-validator');
const errorsResponse = require('../helpers/errors-response');

module.exports = {
    // ================================================
    // Sell a movie to a user. Movie must be available
    // ================================================
    /**
     * @swagger
     * components:
     *  schemas:
     *    CreateSaleRequest:
     *      type: object
     *      required:
     *        - lines
     *      properties:
     *        lines:
     *          type: array
     *          items:
     *            type: object
     *            required:
     *              - movieId
     *              - quantity
     *            properties:
     *              movieId:
     *                type: integer
     *                description: ID of the movie
     *              quantity:
     *                type: integer
     */
    create: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({
                    error: errorsResponse(errors)
                });
            }
            const userId = req.user.id;
            const { lines } = req.body;
            const sale = await Sale.create({
                UserId: userId
            },{ transaction: t });
            let count = 0;
            for(const line of lines){
                const movie = await Movie.findOne({ where: { id: line.movieId } });
                if(!movie){
                  return res.status(404).json({
                    error: 'Movie not found'
                  });
                }
                if(!movie.availability) {
                    return res.status(422).json({
                        error: 'Movie is not available'
                    });
                }
                await SaleLine.create({
                    SaleId: sale.id,
                    MovieId: line.movieId,
                    quantity: line.quantity,
                    priceUnit: movie.salePrice
                }, { transaction: t });
                count += line.quantity;
            }
            await t.commit();
            // Save sale log
            salesLog(req.user, count);
            res.json(sale);
        }catch(err) {
            await t.rollback();
            res.status(500).json({
                error: err.message
            });
        }
    },
    validate: (method) => {
        switch(method){
            case 'create': {
                return [
                    body('lines', 'Add at least one sale line').exists().isArray({ min: 1 }),
                    body('lines.*.movieId', 'movie_id is required and must be positive integer').exists().isInt({ min: 1 }),
                    body('lines.*.quantity', 'quantity is required and must be positive integer').exists().isInt({ min: 1 }),
                ];
            }
        }
    },
};
