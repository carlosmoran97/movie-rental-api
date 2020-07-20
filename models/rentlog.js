'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class RentLog extends Model {};
RentLog.init({
  message: DataTypes.STRING
}, {
  sequelize,
  modelName: 'RentLog',
});

RentLog.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  }
});

module.exports = RentLog;