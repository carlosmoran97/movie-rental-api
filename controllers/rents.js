const Rent = require('../models/rent');
const RentLine = require('../models/rentline');
const Movie = require('../models/movie');
const sequelize = require('../config/database');
const RentState = require('../config/rent-state');
const moment = require('moment');

module.exports = {
    // ======================================
    // Rent a movie. Movie must be available
    // ======================================
    create: async(req, res) => {
        const t = await sequelize.transaction();
        try {
            const userId = req.user.id;
            const { lines } = req.body;
            const rent = await Rent.create({
                UserId: userId,
                returningDate: new Date(moment()
                    .add(parseInt(process.env.RENTAL_TIME), process.env.RENTAL_TIME_UNIT)
                    .format('YYYY-MM-DD HH:mm:ss')
                ),
                state: RentState.isRented,
                monetaryPenalty: 0.00
            },{ transaction: t });
            for(const line of lines){
                const movie = await Movie.findOne({ where: { id: line.movieId } });
                if(!movie.availability) {
                    throw new Exception('Movie must be available.');
                }
                await RentLine.create({
                    RentId: rent.id,
                    MovieId: line.movieId,
                    quantity: line.quantity,
                    priceUnit: movie.rentalPrice
                }, { transaction: t });
            }
            await t.commit();
            res.json(rent);
        }catch(err) {
            await t.rollback();
            res.status(500).json({
                error: err.message
            });
        }
    },
    returnMovie: async(req, res) => {

    },
    payMonetaryPenalty: async(req, res) => {

    },
};