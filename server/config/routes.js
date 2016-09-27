const helpers = require('./helpers.js');

module.exports = (app, express) => {
  app.use(express.static(__dirname + '/../../client'));

  app.post('/test', (req, res) => {
    helpers.testPost(req.body, res);
  });


// CHECK SESSION
  app.get('/checkauth', helpers.requireLogin, (req, res) => {
    res.send(200);
  });

// SIGNUP
  app.post('/signup', (req, res) => {
    helpers.signup(req, res);
  });
};