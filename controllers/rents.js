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
            // Returning time can be setted on enviroment variables. By default is 2 days
            const rent = await Rent.create({
                UserId: userId,
                returningDate: new Date(moment()
                    .add(parseInt(process.env.RENTAL_TIME || 2), process.env.RENTAL_TIME_UNIT || 'days')
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
    // ==============================================================================
    // Return a movie. If there is a delay, user will have to pay a monetary penalty
    // The penalty is the number of days multiplied by the number of books multiplied
    // by the monetary penalty per day. Default monetary penalty per day is $0.50
    // ==============================================================================
    returnMovie: async(req, res) => {
        const userId = req.user.id;
        const { id: rentId } = req.params;
        const t = await sequelize.transaction();
        try {
            const rent = await Rent.findByPk(rentId);
            if(!rent) {
                return res.status(404).json({
                    error: 'Rent not found'
                });
            }
            // Status 422: Unprocessable Entity
            // Can't return other user rent
            if(rent.UserId != userId) {
                return res.status(422).json({
                    error: "You cant't return other user rent"
                });
            }
            if(rent.state == RentState.isReturned){
                return res.status(422).json({
                    message: 'Movies already returned'
                });
            } else if(rent.state == RentState.thereIsPenalty) {
                return res.status(422).json({
                    message: 'Movies are returned. But monetary penalty is not already payed'
                });
            }
            const diff = Math.ceil( moment().diff(moment(rent.returningDate), 'days', true) );
            let updates;
            const lines = await RentLine.findAll({
                where: { RentId: rent.id }
            });
            if(diff > 0) {
                // Monetary penalty
                let penalty;
                let totalBooks = 0;
                for(const line of lines){
                    totalBooks += line.quantity;
                }
                penalty = totalBooks * diff * (process.env.MONETARY_PENALTY_PER_DAY || 0.5);
                updates = {
                    state: RentState.thereIsPenalty,
                    monetaryPenalty: penalty
                };
            } else {
                updates = {
                    state: RentState.isReturned
                };
            }
            // Update the rent.
            // If there is penalty the user will have to pay it by calling
            // PUT /rents/:id/pay-monetary-penalty
            await Rent.update(updates, {
                where: { id: rent.id },
                transaction: t
            });
            // Incrementing stock quantity on each returned movie
            for(const line of lines){
                await Movie.increment('stock', {
                    by: line.quantity,
                    where: { id: line.MovieId },
                    transaction: t
                });
            }
            await t.commit();
            res.json(updates);
        }catch(err){
            await t.rollback();
            res.status(500).json({
                error: err.message
            });
        }
    },
    // =========================
    // Pay the monetary penalty
    // =========================
    payMonetaryPenalty: async(req, res) => {
        const userId = req.user.id;
        const { id: rentId } = req.params;
        try {
            const rent = await Rent.findByPk(rentId);
            if(!rent) {
                return res.status(404).json({
                    error: 'Rent not found'
                });
            }
            // Can't return other user rent
            if(rent.UserId != userId) {
                return res.status(400).json({
                    error: "You cant't pay other user monetary penalty"
                });
            }
            // Status 422: Unprocessable Entity
            if(rent.state != RentState.thereIsPenalty){
                return res.status(422).json({
                    message: 'There is no penalty or movies are not already returned.'
                });
            }else {
                await Rent.update({
                    state: RentState.isReturned
                }, {
                    where: { id: rent.id }
                });
                res.json({
                    message: 'Monetary penalty was paid'
                });
            }
        }catch(err){
            res.status(500).json({
                error: err.message
            });
        }
    },
};
