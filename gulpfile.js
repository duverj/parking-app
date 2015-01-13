'use strict';

var src = './src';
var dist = './public';
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

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
/**
* Watch task
*/
gulp.task('watch', function () {};

/**
* Server task
*/
gulp.task('server', function () {

};

gulp.task('default', ['build', 'serve', 'watch']);