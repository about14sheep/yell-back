'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    accountStatus: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    tokenId: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY,
    geoLoc: DataTypes.GEOGRAPHY
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Pin, { foreignKey: 'ownerId' })
    User.hasMany(models.Message, { foreignKey: 'userId' })
    User.hasMany(models.UserPin, { foreignKey: 'userId' })
  };
  User.prototype.isValid = () => true;

  User.prototype.setPassword = function (password) {
    this.accountStatus = 'p';
    this.hashedPassword = bcrypt.hashSync(password)
    return this;
  }

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }

  User.prototype.toSafeObject = function () {
    return {
      createdAt: this.createdAt,
      email: this.email,
      id: this.id,
      name: this.name,
      updatedAt: this.updatedAt
    }
  }
  return User;
};