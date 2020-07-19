const { Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Movie = require('./movie');

class Like extends Model{};

Like.init({}, {
    sequelize,
    modelName: 'Like',
    hooks: {
        afterSave: (like, options) => {
            Movie.increment('likes', {
                by: 1,
                where: { id: like.MovieId },
                transaction: options.transaction
            });
        }
    },
});

Like.belongsTo(User, {
    foreignKey: {
        name: 'UserId',
        allowNull: false
    }
});

Like.belongsTo(Movie, {
    foreignKey: {
        name: 'MovieId',
        allowNull: false
    }
});

module.exports = Like;