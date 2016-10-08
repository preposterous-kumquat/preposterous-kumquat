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
  getPairs
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
    console.log('stack received', JSON.parse(body));
    var mapped = {};
    let parsed = JSON.parse(body);
    parsed.forEach( (photo, idx) => {
      console.log(photo, 'this is the current photo');
      mapped[idx] = {
        id: photo.key,
        url: photo.url,
        lat: photo.latitude,
        long: photo.longitude
      };
    });
    console.log(mapped, 'MAPPPED OBJECT');
    res.json(mapped);
  });
};


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

      var form = new FormData();
      form.append('theme', req.body.theme);
      form.append('name', req.file.originalname);
      form.append('photo', fs.createReadStream(`${__dirname}/../../${file.path}`), {
        contentType: 'image/jpg'
      });

      var r = request.post(`${config.photoProcessor}/photoProcessor/upload/${photoId}`, (err, response, body) => {
        body = JSON.parse(body);
        if (!body.gps) {
          body.gps = {};
          body.gps.lat = userLat;
          body.gps.long = userLong;
        }
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
            console.log('ERROR: ', err);
          });
      });
    }).catch((err) => {
      console.error('ERROR: ', err);
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
    order: '"createdAt" DESC'
  }).then( (photos) => {
    res.send(photos);
    // workers.prepStacks(photos);
  }).catch((err) => {
    console.error('ERROR IN FIND ALL PHOTOS: ', err);
  });
} 

function createPair(req, res) {
  // SORT THE ORDER OF PHOTO ID, SO FIRST PHOTO HAS THE LOWER INDEX
  let pair = [req.query.pair1, req.query.pair2]
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
            if ( allMatches.indexOf(+pair[1]) === -1 ) {
              firstPhoto.addPair(secondPhoto);
            } 
            res.json({
              theme: firstPhoto.Theme.dataValues.theme,
              pair1: formatPhotoModel(firstPhoto),
              pair2: formatPhotoModel(secondPhoto)
            });
          });

        // IF THE PAIR DOES NOT EXIST CREATE PAIR
        
      });


  });
}





    //   models.Photos.findOne({where: {id: pair2}
    //   }).then((pair2) => {
    //     console.log(pair2, 'First photo');
    //     pair1.addPair(pair2);
    //     console.log('Added my pair');

    //     pair1.getPair().then((results) => {
    //       console.log('GETTING MY PAIR', pair1, 'MY PAIR 888888888888', results[0].Pairs, '^^^^^^^^^^^^^^^^^^', results[1].Pairs);
    //       results.forEach((pair) => {
    //         console.log(pair.Pairs.PairId, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
    //       });
    //     });
    //   });
    // }).catch(() => {
    //   console.log('Error: ', err);




function getPairs(req, res) {
  models.Pairs.findAll({
    limit: 5,
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
      where: {
        $or: [
          {id: pairIds}
        ]
      }
    }).then((photos) => {
      resolve({
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




// resolve({ 
//   pair1: {
//     id: photos[0].dataValues.id,
//     file_url: photos[0].dataValues.file_url,
//     lat: photos[0].dataValues.lat,
//     long: photos[0].dataValues.long,
//   }, 
//   pair2: {
//     id: photos[1].dataValues.id,
//     file_url: photos[1].dataValues.file_url,
//     lat: photos[1].dataValues.lat,
//     long: photos[1].dataValues.long,
//   }
// });


// [ { dataValues:
//      { id: 1,
//        file_url: 'https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/004/000000000004.jpg',
//        lat: 46.3165841818283,
//        long: 11.42578125,
//        createdAt: 2016-10-08T19:21:59.694Z,
//        updatedAt: 2016-10-08T19:21:59.694Z,
//        UserId: 1,
//        ThemeId: 1,
//        Pairs: [Object] },
//     _previousDataValues:
//      { id: 1,
//        file_url: 'https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/004/000000000004.jpg',
//        lat: 46.3165841818283,
//        long: 11.42578125,
//        createdAt: 2016-10-08T19:21:59.694Z,
//        updatedAt: 2016-10-08T19:21:59.694Z,
//        UserId: 1,
//        ThemeId: 1,
//        Pairs: [Object] },
//     _changed: {},
//     '$modelOptions':
//      { timestamps: true,
//        instanceMethods: {},
//        classMethods: [Object],
//        validate: {},
//        freezeTableName: false,
//        underscored: false,
//        underscoredAll: false,
//        paranoid: false,
//        rejectOnEmpty: false,
//        whereCollection: [Object],
//        schema: null,
//        schemaDelimiter: '',
//        defaultScope: {},
//        scopes: [],
//        hooks: {},
//        indexes: [],
//        name: [Object],
//        omitNul: false,
//        sequelize: [Object],
//        uniqueKeys: {},
//        hasPrimaryKeys: true },
//     '$options':
//      { isNewRecord: false,
//        '$schema': null,
//        '$schemaDelimiter': '',
//        include: [Object],
//        includeNames: [Object],
//        includeMap: [Object],
//        includeValidated: true,
//        attributes: [Object],
//        raw: true },
//     hasPrimaryKeys: true,
//     __eagerlyLoadedAssociations: [],
//     isNewRecord: false,
//     Pairs:
//      { dataValues: [Object],
//        _previousDataValues: [Object],
//        _changed: {},
//        '$modelOptions': [Object],
//        '$options': [Object],
//        hasPrimaryKeys: true,
//        __eagerlyLoadedAssociations: [],
//        isNewRecord: false } },
//   { dataValues:
//      { id: 6,
//        file_url: 'https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/006/000000000006.jpg',
//        lat: 50.7364551370124,
//        long: 79.62890625,
//        createdAt: 2016-10-08T19:21:59.695Z,
//        updatedAt: 2016-10-08T19:21:59.695Z,
//        UserId: 1,
//        ThemeId: 1,
//        Pairs: [Object] },
//     _previousDataValues:
//      { id: 6,
//        file_url: 'https://s3-us-west-2.amazonaws.com/preposterous-kumquat.photos/000/000/000/006/000000000006.jpg',
//        lat: 50.7364551370124,
//        long: 79.62890625,
//        createdAt: 2016-10-08T19:21:59.695Z,
//        updatedAt: 2016-10-08T19:21:59.695Z,
//        UserId: 1,
//        ThemeId: 1,
//        Pairs: [Object] },
//     _changed: {},
//     '$modelOptions':
//      { timestamps: true,
//        instanceMethods: {},
//        classMethods: [Object],
//        validate: {},
//        freezeTableName: false,
//        underscored: false,
//        underscoredAll: false,
//        paranoid: false,
//        rejectOnEmpty: false,
//        whereCollection: [Object],
//        schema: null,
//        schemaDelimiter: '',
//        defaultScope: {},
//        scopes: [],
//        hooks: {},
//        indexes: [],
//        name: [Object],
//        omitNul: false,
//        sequelize: [Object],
//        uniqueKeys: {},
//        hasPrimaryKeys: true },
//     '$options':
//      { isNewRecord: false,
//        '$schema': null,
//        '$schemaDelimiter': '',
//        include: [Object],
//        includeNames: [Object],
//        includeMap: [Object],
//        includeValidated: true,
//        attributes: [Object],
//        raw: true },
//     hasPrimaryKeys: true,
//     __eagerlyLoadedAssociations: [],
//     isNewRecord: false,
//     Pairs:
//      { dataValues: [Object],
//        _previousDataValues: [Object],
//        _changed: {},
//        '$modelOptions': [Object],
//        '$options': [Object],
//        hasPrimaryKeys: true,
//        __eagerlyLoadedAssociations: [],
//        isNewRecord: false } } ]


// var photoIds = [result[0].dataValues.PairId, result[0].dataValues.PhotoId];




//   result.forEach((pair) => {
//     console.log(pair.dataValues, 'THE FOR EACH');
//     let currentPairIds = [pair.dataValues.PairId, pair.dataValues.PhotoId];
//     console.log(currentPairIds, 'PAIR ARRAY');
//     models.Photos.findAll({
//       where: {
//         $or: [
//           {id: currentPairIds}
//         ]
//       }
//     }).then((photos) => {
//       console.log(photos, 'BACK');
//       recentPairs.push({ 
//         pair1: {
//           file_url: photos[0].dataValues.file_url,
//           lat: photos[0].dataValues.lat,
//           long: photos[0].dataValues.long,
//         }, 
//         pair2: {
//           file_url: photos[1].dataValues.file_url,
//           lat: photos[1].dataValues.lat,
//           long: photos[1].dataValues.long,
//         }
//       });
//       console.log(recentPairs, 'PAIRS');
//     });
//   });

//   return recentPairs;
// }).then((allPairs) => {
//   res.json(allPairs);
// }).catch((err) => {
//   console.log('Error: ', err);
// });
