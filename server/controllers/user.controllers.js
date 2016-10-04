const port = process.env.NODE_ENV === 'PROD' ? require('../config/config.js').PROD : require('../config/config.js').DEV;
const models = require('../../db/index');
const bcrypt = require('bcrypt-nodejs');
const geohash = require('ngeohash');
const countries = require('../countries/countriesJSON');

let isLoggedIn = (req) => req.session ? !!req.session.user : false;

module.exports = {
  requireLogin,
  createSession,
  signup,
  login,
  logout,
  user,
};

function requireLogin(req, res, next) {
  if (!isLoggedIn(req)) {
    res.send(401);
  } else {
    next();
  }
}

function createSession(req, res, newUser) {
  req.session.regenerate( () => {
    req.session.user = newUser;
    res.send();
  });
}

function signup(req, res) {
  let data = req.body;
  models.Users.findOne({where: {email: data.email}})
    .then( (user) => {
      if (!user) {
        bcrypt.hash(data.pw, null, null, (err, hash) => {
          if (err) {
            console.log('hashing error', err);
          }
          models.Users.create({
            email: data.email,
            full_name: data.name,
            password: hash,
            lat: countries[data.loc].lat,
            long: countries[data.loc].long
          }).then( (newUser) => {
            console.log('user created successfully');
            module.exports.createSession(req, res, newUser);
          });
        });
      } else {
        console.log('Account Already Exists');
        res.send(400, {error: 'User Account already exists'});
      }
    })
    .catch( (err) => {
      console.log('error on signup', err);
      res.send(500);
    });
}

function login(req, res) {
  let data = req.body;
  models.Users.findOne({where: {email: data.email}})
    .then( (user) => {
      if (!user) {
        console.log('invalid username');
        res.send(400, {error: 'User Account does not exist'});
      } else {
        if (bcrypt.compareSync(data.pw, user.dataValues.password)) {
          console.log('user login successful');
          module.exports.createSession(req, res, user);
        } else {
          console.log('invalid password');
          res.send(401);
        }
      }
    })
    .catch( (err) => {
      console.log('error on login', err);
      res.send(500);
    });
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  });
}

function user(req, res) {
  user = req.session.user;
  delete user.password;
  console.log(req.session.user);
  res.send(user);
}

