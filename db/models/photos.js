'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photos = sequelize.define('Photos', {
    file_url: DataTypes.STRING,
    geohash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Photos.belongsTo(models.Users);
        Photos.belongsTo(models.Themes);
        Photos.belongsToMany(models.Keywords, {through: 'PhotosKeywords'});      
      }
    }
  });
  return Photos;
};

// How to query
// Item.find({where:{name: "Coffee"},include:[{model: Item, as: 'Subitems'}]})