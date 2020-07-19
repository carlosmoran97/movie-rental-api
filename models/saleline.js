'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Movie = require('./movie');
const Sale = require('./sale');

class SaleLine extends Model {};
SaleLine.init({
  quantity: DataTypes.INTEGER,
  priceUnit: DataTypes.FLOAT
}, {
  hooks: {
    afterSave: (saleLine, options) => {
      Movie.decrement('stock', {
        by: saleLine.quantity,
        where: { id: saleLine.MovieId },
        transaction: options.transaction
      });
    },
  },
  sequelize,
  modelName: 'SaleLine',
});

SaleLine.belongsTo(Sale, {
  foreignKey: {
    name: 'SaleId',
    allowNull: false
  }
});
SaleLine.belongsTo(Movie, {
  foreignKey: {
    name: 'MovieId',
    allowNull: false
  }
});

module.exports = SaleLine;