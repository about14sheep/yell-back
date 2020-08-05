'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', [
      { messageText: 'Dude where are we?', pinId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { messageText: 'idk man this place is nerdy?', pinId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { messageText: 'I was just teleported here!', pinId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { messageText: 'I think you mean spawned m8', pinId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { messageText: 'WHAT?', pinId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { messageText: 'is anyone there?', pinId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { messageText: 'how does this work?', pinId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { messageText: 'i dont think this is working', pinId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
