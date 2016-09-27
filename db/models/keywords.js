'use strict';
module.exports = function(sequelize, DataTypes) {
  var Keywords = sequelize.define('Keywords', {
    keyword: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Keywords.belongsTo(models.Photos);
      }
    }
  });
  return Keywords;
};