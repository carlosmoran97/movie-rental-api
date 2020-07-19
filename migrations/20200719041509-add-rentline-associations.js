'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('RentLines', 'MovieId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Movies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
    await queryInterface.addColumn('RentLines', 'RentId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Rents',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RentLines', 'MovieId');
    await queryInterface.removeColumn('RentLines', 'RentId');
  }
};
