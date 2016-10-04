'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    full_name: DataTypes.STRING,
    password: DataTypes.STRING,
    defaultLat: DataTypes.FLOAT,
    defaultLong: DataTypes.FLOAT,
    createdAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Users.hasMany(models.Photos);
      }
    }
  });
  return Users;
};