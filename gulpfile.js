'use strict';
var src = './src',
  dist = './public',
  nodeModules = './node_modules',
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  serve = require('./app'),
  annotate = require('gulp-ng-annotate'),
  express = require('express'),
  file = require('file'),
  path = require('path'),
  sass = require('gulp-sass'),
  minifyCSS = require('gulp-minify-css'),
  app = express(),
  tasks;

tasks = {
  server: {
    start: function () {
      app.use(serve);
      app.listen(3000);
    }
  },
  watch: function () {
    gulp.watch(['src/javascripts/*.js', 'views/*.jade', 'routes/*.js'], ['build']);
  },
  build: {
    js: {
      modules: function () {
        var modules = getModules(src + '/modules/');
        modules.unshift(src + '/javascripts/*.js');

        gulp.src(modules)
          .pipe(sourcemaps.init())
          .pipe(concat('all.min.js'))
          .pipe(annotate({single_quotes: true}))
          .pipe(uglify())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(dist + '/javascripts/'));
      },
      vendors: function () {
        gulp.src([
          nodeModules + '/angular/*.min.js',
          nodeModules + '/angular-ui-router/release/*.min.js'
        ])
          .pipe(concat('libraries.js'))
          .pipe(gulp.dest(dist + '/javascripts/vendors/'));
      }
    },
    templates: function () {
      gulp.src(src + '/modules/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(dist + '/views/'));
    },
    styles: {
      modules: function () {
        gulp.src(src + '/modules/**/*.sass')
          .pipe(sourcemaps.init())
          .pipe(concat('modules.min.css'))
          .pipe(sass())
          .pipe(minifyCSS())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(dist + '/stylesheets/'));
      },
      foundation: function () {
        gulp.src([
            nodeModules + '/zurb-foundation-5/scss/normalize.scss',
            nodeModules + '/zurb-foundation-5/scss/foundation.scss'
          ])
          .pipe(sourcemaps.init())
          .pipe(concat('foundation.min.css'))
          .pipe(sass())
          .pipe(minifyCSS())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(dist + '/stylesheets/'));
      }
    }
  }
};

/*
 * Scripts setup
 */
gulp.task('build:modules', tasks.build.js.modules);

/**
 * Set scripts (3rd party)
 */
gulp.task('build:libraries', tasks.build.js.vendors);

/**
 * Sets css
 */
gulp.task('build:foundation', tasks.build.styles.foundation);
gulp.task('build:styles', tasks.build.styles.modules);

/**
 * Server task
 */
gulp.task('server', tasks.server.start);

/**
 * Watch task
 */
gulp.task('watch', tasks.watch);

/**
 * Templates
 */
gulp.task('build:templates', tasks.build.templates);

/**
 * Gulp grouped tasks
 */
gulp.task('default', ['build:foundation', 'build:styles', 'build:templates', 'build:libraries', 'build:modules', 'watch']);

/**
 * Iterates through a given folder and find the files that match certain criteria
 * @param  {String} src path of folder to iterate
 * @return {Array} filesToCompile source of files
 */
function getModules(src) {
  var filesToCompile = [];

  // Updating 'filesToCompile' array with expected src's
  file.walkSync(src, function (dirPath, dirs, files) {
    var module = path.basename(dirPath),
      tempModuleFiles = [];

    if (files.length < 1) {
      return;
    }

    // Updating the 'tempModuleFiles' array with files of extension *.js
    for (var i = 0; i < files.length; i++) {
      if (path.extname(path.basename(files[i])) === '.js') {
        tempModuleFiles.push(files[i]);
      }
    }

    if (tempModuleFiles.length < 1) {
      return;
    }

    tempModuleFiles = tempModuleFiles.sort(function (a, b) {
      return path.basename(a, '.js') === module + '.module' ? -1 : 1;
    }).map(function (value) {
      return path.join(dirPath, value);
    });

    filesToCompile = filesToCompile.concat(tempModuleFiles);
  });

  return filesToCompile;
}
