'use strict';

var config = require('./config');

function routes(app) {
  app.get('/*', function(req, res) {
    res.render('main.html', { constants: config.constants });
  });
}

module.exports = routes;
