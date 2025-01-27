'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('../config/role');

/**
 * @swagger
 *components:
 *  schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *           description: Email for the user, needs to be unique.
 *         password:
 *           type: string
 *           format: password
 *         isVerified:
 *           type: boolean
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         name: Carlos
 *         email: carlosmoran.97cr@gmail.com
 *         password: admin
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
  isVerified: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;