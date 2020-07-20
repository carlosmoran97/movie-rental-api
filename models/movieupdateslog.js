'use strict';
const { Model, DataTypes } = require('sequelize');
const Movie = require('./movie');
const sequelize = require('../config/database');

class MovieUpdatesLog extends Model {};

MovieUpdatesLog.init({
  titleUpdate: DataTypes.STRING,
  salePriceUpdate: DataTypes.FLOAT,
  rentalPriceUpdate: DataTypes.FLOAT,
  previousTitle: DataTypes.STRING,
  previousSalePrice: DataTypes.FLOAT,
  previousRentalPrice: DataTypes.FLOAT
}, {
  sequelize,
  modelName: 'MovieUpdatesLog',
});

MovieUpdatesLog.belongsTo(Movie, {
  foreignKey: {
    name: 'MovieId',
    allowNull: false
  }
});

module.exports = MovieUpdatesLog;
