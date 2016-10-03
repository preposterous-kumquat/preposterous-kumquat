const db = require('../index.js');
const bcrypt = require('bcrypt-nodejs');
const geohash = require('ngeohash');
const async = require('async');
const travelPhotos = require('./travelPhotos.js');
const sendToCurator = require('../../server/config/helpers.js').sendToCurator;

const defaultUser = {
  email: 'kumquat@gmail.com',
  name: 'Kumquat Jr',
  password: '123',
  default_loc: geohash.encode(37.773972, -122.431297)
};

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
        default_loc: defaultUser.default_loc
      }).then((user) => {
        callback(null, user.dataValues.id);
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
  // console.log(results, 'RESULTS ');
  let userId = results.user;
  let themeId = results.travelTheme;

  travelPhotos.forEach((photo) => {
    photo.geohash = photo.gps ? geohash.encode(photo.gps.lat, photo.gps.long) : photo.dataValues.geohash;

    /********** UNCOMMENT NEXT LINE IF YOU WANT TO SEND TO REDIS *********************/
    sendToCurator(photo);

    db.Photos.create({
      UserId: userId,
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
          console.log('COMPLETED!!!!!!!!!!!!');
        }).catch((err) => {
          console.log('ERROR: ', err);
        });
    });
  });
});





  //   photo.clarifaiKeywords.forEach((keyword) => {
  //     models.Keywords.findOrCreate({where: {keyword: keyword}})
  //       .then((keyword) => {
  //         allKeywords.push(keyword[0].dataValues.id);
  //       });
  //   });
  //   travelPhoto.addKeywords(allKeywords);
  // }).catch((err) => {
  //   console.log('PHOTO CREATION ERROR: ', err);
  // });

// db.Photoscreate()




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



// bcrypt.hash(defaultUser.password, null, null, (err, hash) => {
//   db.Themes.create({
//     theme: theme.travel 
//   }).then((travelTheme) => {
//     db.Users.create({
//       email: defaultUser.email,
//       full_name: defaultUser.name,
//       password: hash,
//       default_loc: defaultUser.default_loc
//     }).then((defaultUser) => {
//       let userID = defaultUser.dataValues.id;
//       travelPhotos.forEach((photo) => {
//         photo.geohash = photo.gps ? geohash.encode(photo.gps.lat, photo.gps.long) : photo.dataValues.geohash;
//         console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HIT I GOT THIS FAR', photo.geohash, travelTheme.dataValues.id);


//         db.Photos.create({
//           UserId: userID,
//           geohash: photo.geohash,
//           file_url: photo.url,
//           ThemeId: travelTheme.dataValues.id,
//         }).then((travelPhoto) => {
//           let allKeywords = []; 
//           photo.clarifaiKeywords.forEach((keyword) => {
//             models.Keywords.findOrCreate({where: {keyword: keyword}})
//               .then((keyword) => {
//                 allKeywords.push(keyword[0].dataValues.id);
//               });
//           });
//           travelPhoto.addKeywords(allKeywords);
//         }).catch((err) => {
//           console.log('PHOTO CREATION ERROR: ', err);
//         });




//       });

//     }); 
//   });
// });


// console.log(gatherKeywords(travelPhotos));
