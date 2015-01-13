'use strict';

var src = './src';
var dist = './public';
var nodeModules = './node_modules';
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var serve = require('./app');
var express = require('express');
var app = express();

/**
 * Scripts setup
 */
gulp.task('build', ['build:libraries'], function () {
  gulp.src(src + '/javascripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist + '/javascripts/'));
});


/**
 * Set scripts (3rd party)
 */
gulp.task('build:libraries', function () {
  gulp.src(nodeModules + '/angular/*.min.js')
    .pipe(concat('libraries.js'))
    .pipe(gulp.dest(dist + '/javascripts/vendors/'));
});

/**
* Server task
*/
gulp.task('server', function () {
  app.use(serve);
  app.listen(3000);
});

gulp.task('default', ['build', 'server']);