const Sale = require('../models/sale');
const SaleLine = require('../models/saleline');
const sequelize = require('../config/database');
const Movie = require('../models/movie');

module.exports = {
    // ================================================
    // Sell a movie to a user. Movie must be available
    // ================================================
    create: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const userId = req.user.id;
            const { lines } = req.body;
            const sale = await Sale.create({
                UserId: userId
            },{ transaction: t });
            for(const line of lines){
                const movie = await Movie.findOne({ where: { id: line.movieId } });
                if(!movie.availability) {
                    throw new Exception('Movie must be available.');
                }
                await SaleLine.create({
                    SaleId: sale.id,
                    MovieId: line.movieId,
                    quantity: line.quantity,
                    priceUnit: movie.salePrice
                }, { transaction: t });
            }
            await t.commit();
            res.json(sale);
        }catch(err) {
            await t.rollback();
            res.status(500).json({
                error: err.message
            });
        }
    },
};
