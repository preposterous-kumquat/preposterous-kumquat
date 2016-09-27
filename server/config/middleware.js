const morgan = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const imagemagick = require('imagemagick');
const db = require('../../db/index.js')
const secret = require('../../api-key.js')

const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({
    secret: secret.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new SequelizeStore({
      db: db.sequelize
    }),
    proxy: true
  }));
};