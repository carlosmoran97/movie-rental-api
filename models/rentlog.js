'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class RentLog extends Model {};
RentLog.init({
  message: DataTypes.STRING,
  UserId: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'RentLog',
});

module.exports = RentLog;