'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    full_name: DataTypes.STRING,
    password: DataTypes.STRING,
    default_loc: DataTypes.STRING,
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