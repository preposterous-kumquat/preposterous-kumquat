const express = require('express');
const app = express();

const port = process.env.NODE_ENV === 'PROD' ? 80 : 3000;
const db = require('../db/index.js').sequelize;

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(port, function() {
  console.log('Listening on http://localhost:', port);
   db.sync().then(function() {
    console.log('Synced with PostgreSQL!');
  });
});
