'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    accountStatus: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    geoLoc: DataTypes.GEOGRAPHY
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Pin, { foreignKey: 'ownerId' })
    User.hasMany(models.Message, { foreignKey: 'userId' })
    User.hasMany(models.UserPin, { foreignKey: 'userId' })
  };
  return User;
};