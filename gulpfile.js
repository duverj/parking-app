'use strict';

var src = './src';
var dist = './public';
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
gulp.task('build', function () {
  gulp.src(src + '/javascripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist + '/javascripts/'));
});
gulp.task('watching',function() {
	gulp.watch('src/javascripts/*.js',function() {
		console.log('watching!');
	});
});
/**
* Server task
*/
gulp.task('server', function () {
  app.use(serve);
  app.listen(3000);
});
gulp.task('default', ['build', 'server']);
