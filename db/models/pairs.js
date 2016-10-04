
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pairs = sequelize.define('Pairs', {
    pair_name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Pairs.hasOne(models.Photos, {through: 'Pair1'});
        Pairs.hasOne(models.Photos, {through: 'Pair2'});  
        Pairs.hasOne(models.Themes, {through: 'Theme'});   
      }
    }
  });
  return Pairs;
};

// How to query
// Item.find({where:{name: "Coffee"},include:[{model: Item, as: 'Subitems'}]})