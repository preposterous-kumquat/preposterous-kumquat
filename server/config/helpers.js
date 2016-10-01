const port = process.env.NODE_ENV === 'PROD' ? require('./config.js').PROD : require('./config.js').DEV;
const models = require('../../db/index');
const workers = require('./workers');
const bcrypt = require('bcrypt-nodejs');
const request = require('request');
const multiparty = require('multiparty');
const FormData = require('form-data');
const geohash = require('ngeohash');
const http = require('http');

let isLoggedIn = (req) => req.session ? !!req.session.user : false;

let sendToCurator = (data) => {
  let options = {
    uri: 'http://localhost:3002/save',
    method: 'POST',
    json: data
  };
  request(options, (err, response, body) => {
    console.log('data sent')
  });
};

let getStack = (seed, res) => {
  let options = {
    uri: 'http://localhost:3002/getstack',
    method: 'GET',
    qs: {
      id: seed.id,
      theme: seed.theme
    }
  };
  request(options, (err, response, body) => {
    if (err) {
      console.log('error in getting stack', err);
    }
    console.log('stack received', JSON.parse(body));
    var mapped = {};
    let parsed = JSON.parse(body);
    parsed.forEach( (photo, idx) => {
      console.log(photo, 'this is the current photo')
      mapped[idx] = {
        id: photo.key,
        url: photo.url,
        lat: photo.latitude,
        long: photo.longitude
      }
    })
    res.send(mapped);
  });
};


module.exports = {
  requireLogin: (req, res, next) => {
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
              default_loc: data.loc
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
    console.log('inside login>>>>>>>>>');
    models.Users.findOne({where: {email: data.email}})
      .then( (user) => {
        console.log(data, 'asdfasdf')
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
      })
  },
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/')
    });
  },
  user: (req, res) => {
    user = req.session.user;
    delete user.password
    console.log(req.session.user);
    res.send(user);
  },
  upload: (req, res) => {
    console.log('INSIDE OF UPLOAD');
    let userID = req.session.user.id;
    let userLoc = req.session.user.default_loc;

    models.Photos.create({
      UserId: userID,
      geohash: userLoc,
      file_url: 'dummy url'
    })
    .then( (photo) => {
      let photoId = photo.dataValues.id;
      console.log('in here tooooooooo 8888888')
      /************************ NEED TO FIX FOR DEV *********************************/
      req.pipe(request(`http://localhost:3001/photoProcessor/upload/${photoId}`)).pipe(res);
    });
  },
  photos: (req, res) => {
    let userID = req.session.user.id;
    
    models.Photos.findAll({ 
      where: {
        UserId: userID
      },
      limit: 6,
      order: '"createdAt" DESC'
    })
    .then( (photos) => {
      res.send(photos);
      // workers.prepStacks(photos);
    });
  },
  stack: (req, res) => {
    let seed = req.query;
    getStack(seed, res);
  },
  savedPhoto: (req, res) => {
    let body = req.body;
    models.Photos.findOne({where: {id: body.id}})
      .then( (photo) => {
        body.geohash = body.GPS ? geohash.encode(body.GPS.lat, body.GPS.long) : photo.dataValues.geohash;
        sendToCurator(body);
        return photo;
      })
      .then((photo) => {
        models.Themes.findOrCreate({where: {theme: body.theme}})
          .then((theme) => {
            photo.update({
              geohash: body.geohash,
              file_url: body.url,
              ThemeId: theme[0].dataValues.id
            });
          });
        return photo;
      })
      .then((photo) => {
        // console.log('UPDATE RESULT', result);
        let keywordsPK = [];
        body.clarifaiKeywords.forEach((keyword) => {
          models.Keywords.findOrCreate({where: {keyword: keyword}})
            .then((keyword) => {
              keywordsPK.push(keyword[0].dataValues.id);
            })
            .then(() => {
              return photo.addKeywords(keywordsPK);
            })
            .catch((err) => {
              // console.log('ERROR: ', err);
            });
        });
      })
      .then(() => {
        res.send('successfully saved photo');
      })
      .catch((err) => {
        // console.log('ERROR: ', err);
      });
  }
};

