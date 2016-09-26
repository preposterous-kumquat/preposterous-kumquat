const Sequelize = require('sequelize');
const settings = require('../api-key.js');
const sequelize = new Sequelize('app', settings.sequelize.username, setting.sequelize.password, {
  dialect: 'postgres',
  port: 5432
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connected to DB succesful');
  }, function(err) {
    console.log('Unable to connect to DB. Error:', err);
  });