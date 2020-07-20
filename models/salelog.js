'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class SaleLog extends Model { };
SaleLog.init({
  message: DataTypes.STRING
}, {
  sequelize,
  modelName: 'SaleLog',
});

SaleLog.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  }
});

module.exports = SaleLog;