'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Rents', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Rents', 'UserId');
  }
};
