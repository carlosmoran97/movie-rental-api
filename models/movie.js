'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *    required:
 *      - title
 *      - description
 *      - rentalPrice
 *      - salePrice
 *      - availability
 *      - stock
 *    properties:
 *      id:
 *        type: integer
 *      title:
 *        type: string
 *      description:
 *        type: string
 *      image:
 *        type: string
 *        format: uri
 *        description: URL of the image
 *      rentalPrice:
 *        type: number
 *      salePrice:
 *        type: number
 *      availability:
 *        type: boolean
 *        description: Movies that are available to be selled or rented
 *      stock:
 *        type: integer
 *        description: The physical inventory of a movie
 *      likes:
 *        type: integer
 *        description: Number of likes that a movie has
 *      updatedAt:
 *        type: string
 *        format: date-time
 *      createdAt:
 *        type: string
 *        format: date-time
 */
class Movie extends Model {}

Movie.init({
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  image: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true
    },
  },
  rentalPrice: DataTypes.FLOAT,
  salePrice: DataTypes.FLOAT,
  availability: DataTypes.BOOLEAN,
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Movie',
});

module.exports = Movie;