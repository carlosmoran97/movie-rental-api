'use strict';
const { Model } = require('sequelize');
const sequelize = require('../config/database');
const Movie = require('./movie');
const Rent = require('./rent');

class RentLine extends Model { };
RentLine.init({
  quantity: DataTypes.INTEGER,
  priceUnit: DataTypes.FLOAT
}, {
  sequelize,
  modelName: 'RentLine',
});

RentLine.belongsTo(Movie, {
  foreignKey: {
    name: 'MovieId',
    allowNull: false
  }
});
RentLine.belongsTo(Rent, {
  foreignKey: {
    name: 'RentId',
    allowNull: false
  }
});

module.exports = RentLine;
