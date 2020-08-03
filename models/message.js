'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    messageText: DataTypes.STRING,
    pinId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};