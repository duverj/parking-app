'use strict';

var src = './src';
var dist = './public';
var gulp = require('gulp');
var concat = require('gulp-concat-sourcemap');

/**
 * Scripts setup
 */
gulp.task('build', function () {
  gulp.src(src + '/javascripts/*.js')
    .pipe(concat('all.min.js', {
      sourcesContent: true,
      sourceRoot: "./"
    }))
    .pipe(gulp.dest(dist + '/javascripts/'));
});