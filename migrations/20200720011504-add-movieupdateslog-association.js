'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('MovieUpdatesLogs', 'MovieId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Movies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('MovieUpdatesLogs', 'MovieId');
  }
};
