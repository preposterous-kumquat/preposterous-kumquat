const models = require('../../db/index');
const bcrypt = require('bcrypt-nodejs');
const request = require('request');


let isLoggedIn = (req) => req.session ? !!req.session.user : false;

module.exports = {
  requireLogin: (req, res, next) => {
    console.log(req.session, 'my sid');
    if (!isLoggedIn(req)) {
      res.send(401);
    } else {
      next();
    }
  },
  createSession: (req, res, newUser) => {
    req.session.regenerate( () => {
      req.session.user = newUser;
      res.send();
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
          res.send(400, {error: 'User Account already exists'});
        }
      })
      .catch( (err) => {
        console.log('error on signup', err);
        res.send(500);
      });
  },
  login: (req, res) => {
    let data = req.body;
    models.Users.findOne({where: {username: data.username}})
      .then( (user) => {
        if (!user) {
          console.log('invalid username');
          res.send(400, {error: 'User Account does not exist'});
        } else {
          if (bcrypt.compareSync(data.password, user.dataValues.password)) {
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
      })
  },
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/')
    });
  },
  upload: (req, res) => {
    console.log(req.session.user, 'reasafsdfa');
    let data = req;
    data.theme = "icecream"
    let userID = req.session.user.id;
    let userLoc = req.session.user.default_loc;
    
    models.Themes.findOne({where: {theme: data.theme}})
    .then( (theme) => {
      if (!theme) {
// DELETE ERROR HANDLING ONCE THEME TABLE IS POPULATED ON INSTANTIATION W/ LIMITED LIST
        console.log('THEME DOES NOT EXIST IN DB!!');
        models.Themes.create({
          theme: data.theme
        });
      } else {
        models.Photos.create({
          UserId: userID,
          ThemeId: theme.dataValues.id,
          geohash: userLoc,
        })
        .then( (photo) => {
          let formData = {
            photo: new Buffer(req.file.buffer),
            id: photo.dataValues.id
          };
          request.post({url: 'PHOTOSERVICEENDPOINTHERE', formData: formData}, (err, body) => {
            if (err) {
              console.log('Error posting photo to file server!', err);
              res.send(500);
            }
            console.log('Photo successfully posted to file server!');
            res.send(201);
          });
        });
      }
    });
  }
}

