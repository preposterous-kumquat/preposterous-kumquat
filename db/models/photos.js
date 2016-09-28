'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photos = sequelize.define('Photos', {
    file_path: DataTypes.STRING,
    geohash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Photos.belongsTo(models.Users);
        Photos.belongsTo(models.Themes);
        Photos.hasMany(models.Keywords);     
      }
    }
  });
  return Photos;
};