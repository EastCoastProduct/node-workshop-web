'use strict';

var express = require('express'),
    http = require('http');

var app = express();

// Configure from env variable
var config = require('./config/config').configure(process.env, __dirname);

// Configure app from config
require('./config/app')(app, config);

// Configure routes
require('./config/routes')(app);

// Create HTTP server
http.createServer(app).listen(config.listenPort);

module.exports = app;
