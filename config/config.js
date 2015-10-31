'use strict';

var config = {};

function configure(env, rootDir) {
  var nodeEnv = env.NODE_ENV || 'development';
  var listenPort = env.PORT || 4001;

  config.env = nodeEnv;
  config.listenPort = listenPort;
  config.rootDir = rootDir;
  config.constants = {
    apiUrl: (env.API_HOST || 'http://localhost:4000'),
    appUrl: (env.WEB_HOST || 'http://localhost:4001') + '/'
  };

  return config;
}

module.exports = config;
module.exports.configure = configure;
