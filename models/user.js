'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('../config/role');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *        example:
 *          name: Carlos
 *          email: carlosmoran.97cr@gmail.com
 *          password: admin
 */
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