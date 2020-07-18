'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Movie extends Model {
  static associate(models) {
    // define association here
  }
};
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
  stock: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Movie',
});

module.exports = Movie;