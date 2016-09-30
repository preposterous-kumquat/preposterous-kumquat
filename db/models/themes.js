'use strict';
module.exports = function(sequelize, DataTypes) {
  var Themes = sequelize.define('Themes', {
    theme: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Themes.hasOne(models.Photos);
        Themes.belongsToMany(models.Keywords, {through: 'ThemeKeywords'});
      }
    }
  });
  return Themes;
};
    