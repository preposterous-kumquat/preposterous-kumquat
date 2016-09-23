const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const imagemagick = require('imagemagick');


module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({
    secret: 'preposterous-kumquat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
};