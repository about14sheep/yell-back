'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPin = sequelize.define('UserPin', {
    pinId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  UserPin.associate = function (models) {
    UserPin.belongsTo(models.User, { foriegnKey: 'userId' })
    UserPin.belongsTo(models.Pin, { foriegnKey: 'pinId' })
  };
  return UserPin;
};