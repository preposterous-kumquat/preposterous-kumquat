'use strict';

module.exports = {
  up: function (queryInterface, Sequelize, done) {
    return queryInterface.createTable(
      'Users',
      {
        id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        default_loc: Sequelize.STRING
      })
    .then( function() {
      return queryInterface.createTable(
        'Keywords',
        {
          id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
          keyword: Sequelize.STRING
        });
      })
    .then( function() {
      return queryInterface.createTable(
        'Themes', 
        {
          id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
          theme: Sequelize.STRING
        });
      })
    .then( function() {
      return queryInterface.createTable(
        'Photos',
        {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
          user_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Users',
              key: 'id'
            }
          },
          theme_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Themes',
              key: 'id'
            }
          },
          file_path: Sequelize.STRING,
          geohash: Sequelize.STRING,
          created_at: Sequelize.DATE
        });
      })
    .then( function() {
      return queryInterface.createTable(
        'Photos_Keywords', 
        {
          photo_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Photos',
              key: 'id'
            }
          },
          keyword_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Keywords',
              key: 'id'
            }
          }
        });
      })
    .then( function() {
      return queryInterface.createTable(
        'Pairs', 
        {
          id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
          photo1_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Photos',
              key: 'id'
            }
          },
          photo2_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Photos',
              key: 'id'
            }
          }
        });
      })
    .then( function() {
      return queryInterface.createTable(
        'Pairs_Tails', {
          pair_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Pairs',
              key: 'id'
            }
          },
          photo_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Photos',
              key: 'id'
            }
          }
        });
      })
    .catch(function(err) {
      console.log('error creating tables', err);
    });
  }
};
