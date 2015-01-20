'use strict';
var src = './src',
    dist = './public',
    nodeModules = './node_modules',
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    serve = require('./app'),
    express = require('express'),
    app = express(),
    tasks;

tasks = {
    runServer : function () {
      app.use(serve);
      app.listen(3000);
    },
    watch : function () {
      gulp.watch(['src/javascripts/*.js','views/*.jade','routes/*.js'], ['build']);
    },
    build : function () {
      gulp.src(src + '/javascripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + '/javascripts/'));
    },
    buildLibraries : function () {
        gulp.src([
          nodeModules + '/angular/*.min.js',
          nodeModules + '/angular-ui-router/release/*.min.js'
          ])
          .pipe(concat('libraries.js'))
          .pipe(gulp.dest(dist + '/javascripts/vendors/'));
    }
};

/*
 * Scripts setup
 */
gulp.task('build', ['build:libraries'], tasks.build);

/**
 * Set scripts (3rd party)
 */
gulp.task('build:libraries', tasks.buildLibraries);

/**
* Server task
*/
gulp.task('server', tasks.runServer);

/**
* Watch task
*/
gulp.task('watch', tasks.watch);

gulp.task('default', ['build', 'watch']);