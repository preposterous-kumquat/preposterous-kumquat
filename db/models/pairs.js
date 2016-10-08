'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pairs = sequelize.define('Pairs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  });
  return Pairs;
};

// How to query
// Item.find({where:{name: "Coffee"},include:[{model: Item, as: 'Subitems'}]})