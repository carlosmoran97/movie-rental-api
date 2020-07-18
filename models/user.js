'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('../config/role');

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
  role: {
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(Role)]
    },
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;