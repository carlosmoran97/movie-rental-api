'use strict';
const { Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
/**
 * @swagger
 * components:
 *  schemas:
 *    Sale:
 *      type: object
 *      required:
 *        - UserId
 *      properties:
 *        id:
 *          type: integer
 *        UserId:
 *          type: integer
 *          description: ID of the user
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */
class Sale extends Model {};

Sale.init({}, {
  sequelize,
  modelName: 'Sale',
});

Sale.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  }
});

module.exports = Sale;