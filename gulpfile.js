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
    express = require('express'),
    file = require('file'),
    path = require('path'),
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
      var modules = getModules(src + '/modules/');
      modules.unshift(src + '/javascripts/*.js');

      gulp.src(modules)
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
    },
    buildTemplates : function () {
      gulp.src([src + '/modules/**/*.jade'])
        .pipe(jade())
        .pipe(gulp.dest(dist + '/views/'));
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

/**
 * Templates
 */
gulp.task('buildTemplates', tasks.buildTemplates);

gulp.task('default', ['buildTemplates', 'build', 'watch']);

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

    if(files.length < 1) {
      return;
    }

    // Updating the 'tempModuleFiles' array with files of extension *.js
    for(var i = 0; i < files.length; i++) {
      if(path.extname(path.basename(files[i])) === '.js') {
        tempModuleFiles.push(files[i]);
      }
    }

    if (tempModuleFiles.length < 1) {
      return;
    }

    tempModuleFiles = tempModuleFiles.sort(function(a, b) {
       return path.basename(a, '.js') === module + '.module' ? -1 : 1;
      }).map(function (value) {
        return path.join(dirPath, value);
      });

    filesToCompile = filesToCompile.concat(tempModuleFiles);
  });

  return filesToCompile;
}