'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    messageText: DataTypes.STRING,
    pinId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Message.associate = function (models) {
    Message.belongsTo(models.Pin, { foreignKey: 'pinId' })
    Message.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Message;
};