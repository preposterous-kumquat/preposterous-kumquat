const helpers = require('./helpers.js');
module.exports = (app, express) => {
  app.use(express.static(__dirname + '/../../client'));

  app.post('/test', function(req, res) {
    helpers.testPost(req.body, res);
  })
};