'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pins', [
      { id: 1, title: 'Where are we?', geoLoc: 'POINT(39.807111 -76.984722)', ownerId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'chat here m8', geoLoc: 'POINT(39.17211 -76.894722)', ownerId: 2, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pins', null, {});
  }
};
