const db = require('../index.js');
const bcrypt = require('bcrypt-nodejs');
const geohash = require('ngeohash');
const async = require('async');
const travelPhotos = require('./travelPhotos.js');
const sendToCurator = require('../../server/controllers/photo.controllers.js').sendToCurator;
const countries = require('../../server/countries/countriesJSON');

const defaultUser = {
  email: 'kumquat@gmail.com',
  name: 'Kumquat Jr',
  password: '123',
  defaultLat: countries['United States'].lat,
  defaultLong: countries['United States'].long
};

console.log(defaultUser.defaultLong)

const theme = {
  travel: 'Travel'
};

let gatherKeywords = (themeArray) => {
  let keywords = {};
  let uniqueKeywords = [];
  themeArray.forEach((photo) => {
    photo.clarifaiKeywords.forEach((keyword) => {
      keywords[keyword] = true;
    });
  });
  for (key in keywords) {
    uniqueKeywords.push(key);
  }
  return uniqueKeywords; 
};



async.parallel({
  user: (callback) => {
    bcrypt.hash(defaultUser.password, null, null, (err, hash) => {
      db.Users.create({
        email: defaultUser.email,
        full_name: defaultUser.name,
        password: hash,
        defaultLat: defaultUser.defaultLat,
        defaultLong: defaultUser.defaultLong
      }).then((user) => {
        callback(null, user);
      });
    });
  },
  travelTheme: (callback) => {

    db.Themes.create({
      theme: theme.travel 
    }).then((travelTheme) => {
      callback(null, travelTheme.dataValues.id);
    });
  },
  travelKeywords: (callback) => {
    let travelKeywords = gatherKeywords(travelPhotos);
    for (var i = 0; i < travelKeywords.length; i++) {
      if (i === travelKeywords.length - 1) {
        db.Keywords.findOrCreate({where: 
          {keyword: travelKeywords[i]}
        }).then(() => {
          callback();
        }).catch((err) => {
          console.log('Error: ', err);
        });

      } else {
        db.Keywords.findOrCreate({where: 
          {keyword: travelKeywords[i]}
        }).catch((err) => {
          console.log('Error: ', err);
        });
      }
    }
  },
}, 
(err, results) => {
  let userId = results.user.dataValues.id;
  let userLat = results.user.dataValues.lat;
  let userLong = results.user.dataValues.long;
  let themeId = results.travelTheme;

  travelPhotos.forEach((photo) => {
    if (!photo.gps) {
      photo.gps.lat = userLat;
      photo.gps.long = userLong;
    }
    /********** UNCOMMENT NEXT LINE IF YOU WANT TO SEND TO REDIS *********************/
    sendToCurator(photo);

    db.Photos.create({
      UserId: userId,
      lat: photo.gps.lat,
      long: photo.gps.long,
      geohash: photo.geohash,
      file_url: photo.url,
      ThemeId: themeId,
    }).then((travelPhoto) => {
      db.Keywords.findAll({where: 
        {$or: [
            {keyword: photo.clarifaiKeywords}
          ]}
        }).then((allKeywords) => {
          let keywordList = [];
          allKeywords.forEach((keyword) => {
            keywordList.push(keyword.id);
          });
          travelPhoto.addKeywords(keywordList);
        }).catch((err) => {
          console.log('ERROR: ', err);
        });
    });
  });
});




    // db.Keywords.findAll({where: 
    //   {$or: [
    //     {keyword: [
    //       'water',
    //       'sunset',
    //       'sea',
    //       'beach',
    //       'reflection',
    //       'dawn',
    //       'river',
    //       'ocean',
    //       'boat',
    //       'fisherman',
    //       'lake',
    //       'sun',
    //       'pier',
    //       'travel',
    //       'ship',
    //       'city',
    //       'watercraft',
    //       'seashore',
    //       'harbor',
    //       'silhouette'
    //     ]}
    //   ]}
    // }).then((all) => {
    //   keywordPK = [];
    //   all.forEach((item) => {
    //     console.log(item.id)
    //   })
    //   console.log();

    // });


