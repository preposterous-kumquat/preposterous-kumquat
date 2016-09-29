const helpers = require('./helpers.js');

module.exports = (app, express) => {
  app.use(express.static(__dirname + '/../../client'));

  app.get('/test', (req, res) => {
    helpers.test(req, res);
  });


// STATIC LANDING PAGE
  app.get('/', (req, res) => {
    res.render();
  })
// CHECK SESSION
  app.get('/checkauth', helpers.requireLogin, (req, res) => {
    res.send(200);
  });

// SIGNUP
  app.post('/signup', (req, res) => {
    helpers.signup(req, res);
  });

// LOGIN
  app.post('/login', (req, res) => {
    helpers.login(req, res);
  });

// LOGOUT
  app.get('/logout', (req, res) => {
    helpers.logout(req, res);
  });

// ADD PHOTO
  app.post('/upload', helpers.requireLogin, (req, res) => {
    helpers.upload(req, res);
  });

// GET THUMBNAILS
  app.get('/photos', helpers.requireLogin, (req, res) => {
    helpers.photos(req, res);
  });

// GET STACK
  app.get('/stack', helpers.requireLogin, (req, res) => {
    helpers.stack(req, res);
  });
};