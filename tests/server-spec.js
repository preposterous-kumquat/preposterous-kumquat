/*

1) Signup to return a session.user
2) Expect all subsequent requests to have session object with user 
2) Expect logging out to remove the session
3) Expect non auth users to get a 401 with /upload
4) Expect non auth users to get a 401 with /photos
5) Expect non auth users to get a 401 with /stack 
*/

/*
  sendToCurator,
  uploadPhoto,
  photos,
  stack,
  validPhoto,
  createPair,
  getPairs
*/





const expect = require('chai').expect;
const request = require('request');
const photosCtrl = require('../server/controllers/photo.controllers.js');
const fs = require('fs');

describe('getPairs function', () => {
  let getPairs = photosCtrl.getPairs;
  it('getPairs should be a function', () =>{
    expect(getPairs).to.be.a('function');
    console.log(getPairs());
  }); 
});




// Expect logging out to remove the sessions