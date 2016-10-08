'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pairs = sequelize.define('Pairs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  // }, {
  //   classMethods: {
  //     associate: function(models) {
  //       Pairs.hasMany(models.Photos);
  //       // Photos.belongsTo(models.Themes);
  //       // Photos.belongsToMany(models.Keywords, {through: 'PhotosKeywords'});           
  //       // Photos.belongsToMany(models.Photos, {as: 'Pair', through: 'Pairs'});      
  //       // Photos.hasMany(models.Photos, {as: 'Pair1', through: 'Pairs', foreignKey: 'pair_id'});      
  //       // Photos.hasMany(models.Photos, {as: 'Pair2', through: 'Pairs', foreignKey: 'other_pair_id'});          
  //     }
  //   }
  });
  return Pairs;
};

// How to query
// Item.find({where:{name: "Coffee"},include:[{model: Item, as: 'Subitems'}]})