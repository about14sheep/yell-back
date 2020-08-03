'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messages', [
      { id: 1, messageText: 'Dude where are we?', pinId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, messageText: 'idk man this place is nerdy?', pinId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, messageText: 'I was just teleported here!', pinId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, messageText: 'I think you mean spawned m8', pinId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, messageText: 'WHAT?', pinId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, messageText: 'is anyone there?', pinId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, messageText: 'how does this work?', pinId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, messageText: 'i dont think this is working', pinId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
