const models = require('../../db/index');
const bcrypt = require('bcrypt-nodejs');
const request = require('request');
const multiparty = require('multiparty');
const FormData = require('form-data');
const geohash = require('ngeohash');

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
    let form = new multiparty.Form();
    form.on('error', (err) => console.log('error parsing upload:', err));

    form.on('part', (part) => {
      if (part.filename) {
        formData.append('photo', part, {
          filename: part.filename, 
          contentType: part["content-type"]
        });
        part.resume();
      }
      part.on('error', (err) => console.log('part error', err));
    });

    form.on('field', (field, value) => {
      models.Themes.findOne({where: {theme: value}})
      .then( (theme) => {
        if (!theme) {
  // DELETE ERROR HANDLING ONCE THEME TABLE IS POPULATED ON INSTANTIATION W/ LIMITED LIST
          console.log('THEME DOES NOT EXIST IN DB!!');
          models.Themes.create({
            theme: value
          });
        } else {
          models.Photos.create({
            UserId: userID,
            ThemeId: theme.dataValues.id,
            geohash: userLoc,
          })
          .then( (photo) => {
            data.id = photo.dataValues.id;
          });
        }
      });
    });

    form.on('close', () => {
      console.log('posting data to photo service');
      let headers = {
       "headers": {
          'content-type': 'multipart/form-data',
          "transfer-encoding": "chunked"
        }
      };

      let r = request.post("http://requestb.in/1k8pwr51", headers, (err, response, body) => { 
        if (err) {
          console.log('error posting to photo service', err);
        } else {
          console.log('photo posted!');
          models.Photos.findOne({where: {id: body.id}})
          .then( (photo) => {
            if (!photo) {
              console.log('error querying DB');
            } else {
              let geohash = body.GPS ? geohash.encode(body.GPS.lat, body.GPS.long) : photo.dataValues.geohash;
              photo.update({
                geohash: geohash,
                file_url: body.path,
                
              })
            }
          })
          res.send(response);
        }
      });
      r._form = formData;
    });

    let data = {};
    let formData = new FormData();
    let userID = req.session.user.id;
    let userLoc = req.session.user.default_loc;
    form.parse(req);
  },
  photos: (req, res) => {

  },
  stack: (req, res) => {

  }
};

