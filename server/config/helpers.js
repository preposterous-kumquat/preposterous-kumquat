const models = require('../../db/index');
const bcrypt = require('bcrypt-nodejs');

let isLoggedIn = (req) => req.session ? !!req.session.user : false;

module.exports = {
  testPost: (data, res) => {
    models.Users.create({
      username: data.username,
      password: data.password,
      default_loc: data.default_loc
    }).then( (user) => {
      console.log('user created at /TEST')
      res.send();
    }).catch( (err) => {
      console.log('error on test', err);
    })
  },
  requireLogin: (req, res, next) => {
    if (!isLoggedIn(req)) {
      // REJECT IF NOT LOGGED IN
      res.send(401);
    } else {
      next();
    }
  },
  createSession: (req, res, newUser) => {
    return req.session.regenerate( () => {
      req.session.user = newUser;
      res.send(200);
    });
  },
  signup: (req, res) => {
    let data = req.body;
    models.Users.findOne({where: {username: data.username}})
      .then( (user) => {
        if (!user) {
          bcrypt.hash(data.password, null, null, (err, hash) => {
            if (err) {
              console.log('hashing error', err);
            }
            models.Users.create({
              username: data.username,
              password: hash,
              default_loc: data.default_loc
            }).then( (newUser) => {
              console.log('user created successfully');
              module.exports.createSession(req, res, newUser);
            })
          })
        } else {
          console.log('Account Already Exists');
          res.send(400, {error: "User Account already exists"});
        }
      })
      .catch( (err) => {
        console.log('error on signup', err);
        res.send(500);
      });
  }
}

