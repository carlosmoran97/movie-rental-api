'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
  static associate(models) {
    // define association here
  }
};
User.init({
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  password: DataTypes.STRING,
  role: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;