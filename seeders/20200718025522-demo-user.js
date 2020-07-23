'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      name: 'Carlos Moran',
      email: 'carlosmoran.97cr@gmail.com',
      password: '$2b$10$ZvRzmAZDKCqMDCu72TdSSOya6nK/r1TY7aJBKWc.ry6BpDYGM8qD6',
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Normal User',
      email: 'user@example.com',
      password: '$2b$10$yjlHxIpH3C.KI7aleAZ0I.NwOSVo53drutEa0XD8pCH8mrp8kCjVW',
      role: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
