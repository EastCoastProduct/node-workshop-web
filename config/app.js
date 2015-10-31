'use strict';

var serveStatic = require('serve-static');

function configureDevelopment(app, config) {
  app.use(serveStatic('src'));

  // Set up views
  app.set('views', config.rootDir + '/src');
}

function configureProduction(app, config) {
  app.use(serveStatic('dist'));

  // Set up views
  app.set('views', config.rootDir + '/dist');
}

function configure(app, config) {
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  if (config.env === 'development') {
    configureDevelopment(app, config);
  } else {
    configureProduction(app, config);
  }
}

module.exports = configure;
