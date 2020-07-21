'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RentStates = require('../config/rent-state');
const User = require('./user');
/**
 * @swagger
 * components:
 *  schemas:
 *    Rent:
 *      type: object
 *      required:
 *        - returningDate
 *        - state
 *        - UserId
 *      properties:
 *        id:
 *          type: integer
 *        returningDate:
 *          type: string
 *          description: The maximun datetime when the user have to return the rented movie
 *        state:
 *          type: string
 *          enum: [isRented, thereIsPenalty, isReturned]
 *          description: |
 *            state | definition
 * 
 *            ______|___________
 * 
 *            isRented | The user have the movies that rented and is still in the legal time to return the movies
 * 
 *            thereIsPenalty | The user returned the movies with delay and have to pay a monetary penalty
 * 
 *            isReturned | The user returned the movies. If there was a penalty this state means that is already payed
 *        monetaryPenalty:
 *          type: number
 *          description: "If the user return a movie with a delay have to pay a monetary penalty that is calculated with: the number of movies that rented * the days of delay * the monetary penalty per day"
 * 
 */
class Rent extends Model {};
Rent.init({
  returningDate: DataTypes.DATE,
  state: {
    type: DataTypes.STRING,
    validate: {
      isIn: [Object.values(RentStates)]
    }
  },
  monetaryPenalty: DataTypes.FLOAT
}, {
  sequelize,
  modelName: 'Rent',
});

Rent.belongsTo(User, {
  foreignKey: {
    name: 'UserId',
    allowNull: false
  }
});

module.exports = Rent;