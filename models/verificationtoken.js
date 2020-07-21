'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class VerificationToken extends Model {};

VerificationToken.init({
  userId: DataTypes.INTEGER,
  token: DataTypes.STRING,
  expireDate: DataTypes.DATE
}, {
  sequelize,
  modelName: 'VerificationToken',
});

VerificationToken.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
});

module.exports = VerificationToken;