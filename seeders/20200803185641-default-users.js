'use strict';
const bcrypt = require('bcryptjs');

const createPassword = _ => {
  return bcrypt.hashSync('password')
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { accountStatus: 'p', email: 'a@a.com', username: 'aa', hashedPassword: createPassword(), geoLoc: 'POINT(56.807222 -92.984722)', createdAt: new Date(), updatedAt: new Date() },
      { accountStatus: 's', email: 'b@b.com', username: 'bb', hashedPassword: createPassword(), geoLoc: 'POINT(39.17222 -76.894722)', createdAt: new Date(), updatedAt: new Date() },
      { accountStatus: 'p', email: 'c@c.com', username: 'cc', hashedPassword: createPassword(), geoLoc: 'POINT(39.807222 -76.984722)', createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
