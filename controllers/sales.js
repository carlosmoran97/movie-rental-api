const Sale = require('../models/sale');
const SaleLine = require('../models/saleline');
const sequelize = require('../config/database');
const Movie = require('../models/movie');
const salesLog = require('../helpers/sales-log');

module.exports = {
    // ================================================
    // Sell a movie to a user. Movie must be available
    // ================================================
    create: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const userId = req.user.id;
            const { lines } = req.body;
            if(!lines || lines.length === 0) {
                throw new Exception('You have to add sale lines.');
            }
            const sale = await Sale.create({
                UserId: userId
            },{ transaction: t });
            let count = 0;
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
