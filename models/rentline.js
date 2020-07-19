'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Movie = require('./movie');
const Rent = require('./rent');

class RentLine extends Model { };
RentLine.init({
  quantity: DataTypes.INTEGER,
  priceUnit: DataTypes.FLOAT
}, {
  hooks: {
    afterSave: (rentLine, options) => {
      Movie.decrement('stock', { 
        by: rentLine.quantity, 
        where: { id: rentLine.MovieId }, 
        transaction: options.transaction 
      });
    }
  },
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
