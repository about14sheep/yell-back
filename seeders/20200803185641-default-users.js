'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { id: 1, accountStatus: 'p', email: 'a@a.com', username: 'aa', password: 'password', geoLoc: 'POINT(56.807222 -92.984722)', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, accountStatus: 's', email: 'b@b.com', username: 'bb', password: 'password', geoLoc: 'POINT(39.17222 -76.894722)', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, accountStatus: 'p', email: 'c@c.com', username: 'cc', password: 'password', geoLoc: 'POINT(39.807222 -76.984722)', createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
