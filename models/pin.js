'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pin = sequelize.define('Pin', {
    title: DataTypes.STRING,
    geoLoc: DataTypes.GEOGRAPHY,
    ownerId: DataTypes.INTEGER
  }, {});
  Pin.associate = function (models) {
    Pin.belongsTo(models.User, { foreignKey: 'ownerId' })
    Pin.hasMany(models.Message, { foreignKey: 'pinId', onDelete: 'CASCADE', hooks: true })
    Pin.hasMany(models.UserPin, { foreignKey: 'pinId' })
  };
  return Pin;
};