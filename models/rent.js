'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RentStates = require('../config/rent-state');
const User = require('./user');

class Rent extends Model {};
Rent.init({
  returningDate: DataTypes.DATE,
  state: {
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(RentStates)]
    }
  },
  monetaryPenalty: DataTypes.FLOAT
}, {
  sequelize,
  modelName: 'Rent',
});

Rent.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  }
});

module.exports = Rent;