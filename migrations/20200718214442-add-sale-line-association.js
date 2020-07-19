'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('SaleLines', 'SaleId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Sales',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
    await queryInterface.addColumn('SaleLines', 'MovieId', {
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
    await queryInterface.removeColumn('SaleLines', 'SaleId');
    await queryInterface.removeColumn('SaleLines', 'MovieId');
  }
};
