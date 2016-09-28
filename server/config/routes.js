const helpers = require('./helpers.js');

module.exports = (app, express) => {
  app.use(express.static(__dirname + '/../../client'));

  app.get('/test', (req, res) => {
    helpers.testPost(req, res);
  });


// CHECK SESSION
  app.get('/checkauth', helpers.requireLogin, (req, res) => {
    console.log(req.session, 'this session')
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
};