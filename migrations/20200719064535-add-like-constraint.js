'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Likes', {
      fields: ['UserId', 'MovieId'],
      type: 'UNIQUE',
      name: 'likes_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Likes', 'likes_pkey');
  }
};
