'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MovieUpdatesLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titleUpdate: {
        type: Sequelize.STRING
      },
      salePriceUpdate: {
        type: Sequelize.FLOAT
      },
      rentalPriceUpdate: {
        type: Sequelize.FLOAT
      },
      previousTitle: {
        type: Sequelize.STRING
      },
      previousSalePrice: {
        type: Sequelize.FLOAT
      },
      previousRentalPrice: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MovieUpdatesLogs');
  }
};