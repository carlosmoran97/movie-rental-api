'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class RecoveryToken extends Model {};

RecoveryToken.init({
  userId: DataTypes.INTEGER,
  token: DataTypes.STRING,
  expireDate: DataTypes.DATE
}, {
  sequelize,
  modelName: 'RecoveryToken',
});

RecoveryToken.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
});

module.exports = RecoveryToken;