const Sale = require('../models/sale');
const SaleLine = require('../models/saleline');
const sequelize = require('../config/database');
const Movie = require('../models/movie');
const salesLog = require('../helpers/sales-log');

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
            const userId = req.user.id;
            const { lines } = req.body;
            if(!lines || lines.length === 0) {
                return res.status(422).json({
                  error: 'Add at last one movie line'
                });
            }
            const sale = await Sale.create({
                UserId: userId
            },{ transaction: t });
            let count = 0;
            for(const line of lines){
                if(!line.movieId || !line.quantity) {
                  return res.status(422).json({
                    error: 'Movie line incomplete data'
                  });
                }
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
};
