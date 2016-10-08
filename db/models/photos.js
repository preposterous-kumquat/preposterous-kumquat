'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photos = sequelize.define('Photos', {
    file_url: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        Photos.belongsTo(models.Users);
        Photos.belongsTo(models.Themes);
        Photos.belongsToMany(models.Keywords, {through: 'PhotosKeywords'});           
        Photos.belongsToMany(models.Photos, {as: 'Pair', through: 'Pairs'});      
        // Photos.hasMany(models.Photos, {as: 'Pair1', through: 'Pairs', foreignKey: 'pair_id'});      
        // Photos.hasMany(models.Photos, {as: 'Pair2', through: 'Pairs', foreignKey: 'other_pair_id'});          
      }
    }
  });
  return Photos;
};

// How to query
// Item.find({where:{name: "Coffee"},include:[{model: Item, as: 'Subitems'}]})