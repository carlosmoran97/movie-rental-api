'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class SaleLog extends Model { };
SaleLog.init({
  message: DataTypes.STRING,
  UserId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'SaleLog',
});

module.exports = SaleLog;