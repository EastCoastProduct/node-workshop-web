// Karma configuration

module.exports = function(config) {
  config.set({

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // Bower sources
      'src/vendor-bower/angular/angular.js',
      'src/vendor-bower/angular-ui-router/release/angular-ui-router.js',
      'src/vendor-bower/ngstorage/ngStorage.js',
      'src/vendor-bower/ng-lodash/build/ng-lodash.js',
      'src/vendor-bower/angular-mocks/angular-mocks.js',

      // App sources
      'src/scripts/app.js',

      'src/scripts/constants/**/*.js',
      'src/scripts/controllers/**/*.js',
      'src/scripts/directives/**/*.js',
      'src/scripts/services/**/*.js',

      // Views
      'src/views/**/*.html',

      // Fixtures
      'src/scripts/tests/fixtures/**/*.js',

      // Tests
      'src/scripts/tests/unit/**/*.js'
    ],

    preprocessors: {
      'src/scripts/{app.js,!(vendor-bower|tests)/**/*.js}': ['coverage'],
      'src/views/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path so in test we can use same template
      // paths as it is in code
      stripPrefix: 'src/',
      moduleName: 'templates'
    },

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress', 'dots', 'coverage'],

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: ['PhantomJS'],

    plugins: [
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-ie-launcher'
    ],

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text'},
        {type: 'html'}
      ]
    }
  });
};
