const morgan = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('../../db/index.js');
const secret = require('../../api-key.js');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser(secret.secret));
  app.use(session({
    secret: secret.secret,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new SequelizeStore({
      db: db.sequelize
    }),
    proxy: true
  }));
};