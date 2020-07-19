'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Sale extends Model {};
Sale.init({}, {
  sequelize,
  modelName: 'Sale',
});

Sale.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  }
});

module.exports = Sale;