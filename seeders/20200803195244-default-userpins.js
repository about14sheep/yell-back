'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserPins', [
      { pinId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { pinId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { pinId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserPins', null, {});
  }
};
