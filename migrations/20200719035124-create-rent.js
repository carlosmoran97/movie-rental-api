'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      returningDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      monetaryPenalty: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable('Rents');
  }
};