module.exports = (app, express) => {
  app.use(express.static(__dirname + '/../../client'));
};