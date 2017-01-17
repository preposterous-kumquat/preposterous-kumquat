const config = process.env.NODE_ENV === 'PROD' ? require('../config/config.js').PROD : require('../config/config.js').DEV;
const models = require('../../db/index');
const request = require('request');
const multiparty = require('multiparty');
const fs = require('fs');
const FormData = require('form-data');
const geohash = require('ngeohash');
const http = require('http');
const countries = require('../countries/countriesJSON');
const Promise = require('bluebird');

let isLoggedIn = (req) => req.session ? !!req.session.user : false;

module.exports = {
  sendToCurator,
  uploadPhoto,
  photos,
  stack,
  validPhoto,
  createPair,
  getPairs,
  train,
  getRandStack
};


function train (req, res) {
  let counter = 1;
  let automate = function() {
    let reqconfig = {
      method: 'POST',
      uri: `${config.curator}/getTrainingData`
    }
    request(reqconfig, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        if (counter <= 49) {
          counter++;
          automate();
        } else {
          res.send();
        }
      }
    })
  };
  automate();
};

function sendToCurator (data) {
  let options = {
    uri: `${config.curator}/save`,
    method: 'POST',
    json: data
  };
  request(options, (err, response, body) => {
    if (err) {
      console.log('Error: ', err);
    }
  });
}

function sendToCuratorAsync (data) {
  let options = {
    uri: `${config.curator}/save`,
    method: 'POST',
    json: data
  };
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      resolve(response);
      reject(err);
    }); 
  });
}

function stack(req, res) {
  let seed = req.query;
  getStack(seed, res);
}

function getStack(seed, res) {
  console.log('CONFIG', config.curator)
  let options = {
    uri: `${config.curator}/getstack`,
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
    // console.log('stack received', JSON.parse(body));
    var mapped = {};
    let parsed = JSON.parse(body);
    parsed.forEach( (photo, idx) => {
      mapped[idx] = {
        id: photo.key,
        url: photo.url,
        lat: photo.latitude,
        long: photo.longitude
      };
    });
    res.json(mapped);
  });
}

function getRandStack(req, res) {
  let options = {
    uri: `${config.curator}/getRandStack`,
    method: 'GET',
  };
  request(options, (err, response, body) => {
    if (err) {
      console.log('error in getting stack', err);
    } else {
      res.json(JSON.parse(body));
    }
  });
}

function uploadPhoto(req, res) {
  if (req.file) {
    let userID = req.session.user.id;
    let userLat = req.session.user.defaultLat;
    let userLong = req.session.user.defaultLong;
    let file = req.file;

    models.Photos.create({
      UserId: userID
    }).then( (photo) => {
      let photoId = photo.dataValues.id;
      console.log(photoId, 'NEW PHOTO ID *************************')
      var form = new FormData();
      form.append('theme', req.body.theme);
      form.append('name', req.file.originalname);
      form.append('photo', fs.createReadStream(`${__dirname}/../../${file.path}`), {
        contentType: 'image/jpg'
      });

      var r = request.post(`${config.photoProcessor}/photoProcessor/upload/${photoId}`, (err, response, body) => {
      // var r = request.post(`photo-processor/photoProcessor/upload/${photoId}`, (err, response, body) => {
        body = JSON.parse(body);
        console.log(body, "THIS IS THE BODIES")
        if (!body.gps) {
          body.gps = {};
          body.gps.lat = userLat;
          body.gps.long = userLong;
        }
        console.log('THIS IS THE BODY THAT"S BACK ^^^^^^^^^^^^^^^^^^^^^^^', body);
        sendToCuratorAsync(body)
          .then((stack)=> {
            fs.unlink(`${__dirname}/../../${file.path}`);
            savePhoto(body);
            res.json(body);
          });
      });
      r._form = form;     
    });
  }
}

function savePhoto(body) {
  models.Photos.findOne({where: {id: body.id}})
    .then((photo) => {
      console.log(body.theme, 'THE THEME');
      models.Themes.findOrCreate({where: {theme: body.theme}})
        .then((theme) => {
          photo.update({
            lat: body.gps.lat,
            long: body.gps.long,
            file_url: body.url,
            ThemeId: theme[0].dataValues.id
          });
        });
      return photo;
    })
    .then((photo) => {
      let actions = body.clarifaiKeywords.map(findKeyword);
      let results = Promise.all(actions);
      results.then((allKeywords) => {
        photo.addKeywords(allKeywords);
      });
    })
    .catch((err) => {
      console.log('Could not find photo, error: ', err);
    });
}


function findKeyword(keyword) {
  return new Promise((resolve, reject) => {
    models.Keywords.findOrCreate({where: {keyword: keyword}})
      .then((keyword) => {
        // console.log(keyword, 'MY KEYWORD FOUND', keyword[0].dataValues.id, 'KEYWORD ID =========================');
        resolve(keyword[0].dataValues.id);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function validPhoto(req, res) {
  req.pipe(request(`${config.photoProcessor}/photoProcessor/validPhoto`)).pipe(res);
};

function photos (req, res) {
  let userID = req.session.user.id;
  console.log('This is my user id in the GET /photos:', userID);
  models.Photos.findAll({ 
    where: {
      UserId: userID
    },
    // limit: 6,
    include: [models.Themes],
    order: '"createdAt" DESC'
  }).then( (photos) => {
    res.send(photos);
    // workers.prepStacks(photos);
  }).catch((err) => {
    console.error('ERROR IN FIND ALL PHOTOS: ', err);
  });
} 

// DOES NOT CHECK FOR IF PHOTOS ARE IN THE SYSTEM
function createPair(req, res) {
  // SORT THE ORDER OF PHOTO ID, SO FIRST PHOTO HAS THE LOWER INDEX
  console.log('req body in create pair func', req.body);
  let pair = [req.body.pair1, req.body.pair2]
                .sort((a, b) => {
                  return a - b;
                });

  // QUERY FOR FIRST PHOTO
  models.Photos.findOne({
    where: 
      {id: pair[0]},
    include: [
      {model: models.Themes}
    ]
  }).then((firstPhoto) => {
    // FIND ALL PAIRS FOR FIRST PHOTO
    let allMatches = [];

    // GENERATE AN ARRAY OF ALL OF PAIR 1'S PAIR'S ID's
    firstPhoto.getPair()
      .then((matches) => {
        matches.forEach((pair) => {
          allMatches.push(pair.Pairs.PairId);
        });

        models.Photos.findOne({where: {id: pair[1]}
          }).then((secondPhoto) => {
            // IF MATCH DOES NOT EXIST CREATE PAIR
            if ( allMatches.indexOf(+pair[1]) === -1 ) {
              firstPhoto.addPair(secondPhoto);
            } 

            // console.log('response from create pair', {
            //   theme: firstPhoto.Theme.dataValues.theme,
            //   pair1: formatPhotoModel(firstPhoto),
            //   pair2: formatPhotoModel(secondPhoto)
            // });
            // SENDING BACK PAIR
            res.json({
              theme: firstPhoto.Theme.dataValues.theme,
              pair1: formatPhotoModel(firstPhoto),
              pair2: formatPhotoModel(secondPhoto)
            });
          });    

      });
  });
}

function getPairs(req, res) {
  models.Pairs.findAll({
    limit: 10,
    order: '"createdAt" DESC'
  }).then((result) => {
    let recentPairs = [];

    result.forEach((pair) => {
      recentPairs.push(
        [pair.dataValues.PairId, pair.dataValues.PhotoId]
          .sort((a, b) => {
            return a - b;
          })
      );
    });

    let actions = recentPairs.map(findPair);
    let results = Promise.all(actions);

    results.then((allPairs) => {
      res.json(allPairs);
    }).catch((err) => {
      console.log('Error 1: ', err);
    });
  }).catch((err) => {
    console.log('Error 2: ', err);
  });
}


let findPair = (pairIds) => {
  return new Promise((resolve, reject) => {
    models.Photos.findAll({
      where: { $or: [
          {id: pairIds}
        ]
      },
      include: [
        {model: models.Themes}
      ]
    }).then((photos) => {
      resolve({
        theme: photos[0].Theme.dataValues.theme,
        pair1: formatPhotoModel(photos[0]),
        pair2: formatPhotoModel(photos[1])
      });
    }).catch((err) => {
      reject(err);
    });
  });
};

let formatPhotoModel = (photo) => {
  return {
    id: photo.dataValues.id,
    file_url: photo.dataValues.file_url,
    lat: photo.dataValues.lat,
    long: photo.dataValues.long,
  };
};


