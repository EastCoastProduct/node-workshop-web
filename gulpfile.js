'use strict';

var del = require('del'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    copy = require('gulp-copy'),
    cssmin = require('gulp-cssmin'),
    eslint = require('gulp-eslint'),
    filter = require('gulp-filter'),
    karma = require('gulp-karma'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    scsslint = require('gulp-scss-lint'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gutil = require('gulp-util');

var paths = {
  lintjs: [
    'gulpfile.js',
    './src/scripts/**/*.js',
    'server.js',
    './config/**/*.js',
    '!./src/scripts/vendor-bower/**'
  ],
  unitTests: [
    './src/scripts/tests/unit/**/*.js',
    './src/scripts/tests/fixtures/**/*.js'
  ],
  styles: './src/styles/**/*.scss'
};

gulp.task('build-html', ['styles'], function() {
  var jsFilter = filter('**/*.js');
  var cssFilter = filter('**/*.css');

  var userefAssets = useref.assets();

  return gulp.src(['./src/**/*.html', '!./src/vendor-bower/**/*.html'])
    .pipe(userefAssets)
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(cssmin())
    .pipe(cssFilter.restore())
    .pipe(rev())
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-assets', ['clean'], function() {
  return gulp.src('./src/images/**').pipe(copy('./dist/images', {prefix: 2}));
});

gulp.task('copy-font-awesome', ['clean'], function() {
  return gulp.src('./src/vendor-bower/font-awesome/**')
    .pipe(copy('./dist/vendor-bower/font-awesome', {prefix: 3}));
});

gulp.task('styles', ['clean'], function() {
  return gulp.src(paths.styles)
    .pipe(sass({
      onError: function(error) {
        gutil.log(gutil.colors.red(error));
        gutil.beep();
      },
      onSuccess: function() {
        gutil.log(gutil.colors.green('Sass styles compiled successfully.'));
      }
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./src/styles'));
});

gulp.task('lint-js', function() {
  return gulp.src(paths.lintjs)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lint-unit-tests', function() {
  return gulp.src(paths.unitTests)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lint', ['lint-js', 'lint-unit-tests']);

// this task needs Ruby dependencies (see README.md) and needs to be run
// independently
gulp.task('lint-scss', function() {
  gulp.src(paths.styles)
    .pipe(scsslint({config: '.scss-lint.yml'}))
    .on('error', function(err) {
      if (gulp.env['exit-on-error']) {
        throw err;
      }
    });
});

gulp.task('test-unit', function() {
  return karma({configFile: 'karma.conf.js'}).once({});
});

gulp.task('test-unit-watch', function() {
  return karma({configFile: 'karma.conf.js'}).start({
    autoWatch: true,
    colors: true
  });
});

gulp.task('test-unit-browsers', function() {
  return karma({configFile: 'karma.conf.js'}).once({
    reporters: ['progress', 'dots'],
    browsers: ['Chrome', 'Firefox', 'Safari']
  });
});

gulp.task('clean', function(cb) {
  del([
    'dist/**'
  ], cb);
});

gulp.task('server', function() {
  nodemon({
    script: './server.js'
  });
});

gulp.task('watch', function() {
  gulp.run('test-unit-watch');
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.lintjs, ['lint-js']);
  gulp.watch(paths.unitTests, ['lint-unit-tests']);
  gulp.watch(paths.styles, ['lint-scss']);
});

gulp.task('build', [
  'clean',
  'build-html',
  'copy-assets',
  'copy-font-awesome'
]);

gulp.task('default', function() {
  gulp.run('server', 'styles', 'lint', 'lint-scss', 'watch');
});
