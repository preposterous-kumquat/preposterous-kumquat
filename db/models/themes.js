'use strict';
module.exports = function(sequelize, DataTypes) {
  var Themes = sequelize.define('Themes', {
    theme: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Themes.belongsTo(models.Photos);
        Themes.hasMany(models.Keywords);
      }
    }
  });
  return Themes;
};