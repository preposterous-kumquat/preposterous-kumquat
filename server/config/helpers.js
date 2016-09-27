const models = require('../../db/index');

module.exports = {
  testPost: function(data, res) {
    models.Users.create({
      username: data.username,
      password: data.password,
      default_loc: data.default_loc
    }).then(function(user) {
      console.log('user created at /TEST')
      res.send();
    }).catch(function(err) {
      console.log('error on test', err);
    })
  }
}