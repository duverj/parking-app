// Login controller
'use strict';

login.controller('loginCtrl', function ($state) {
  this.methods = {};

  this.methods.submit = function () {
    console.log('user submitted login');
  };

  this.methods.cancel = function () {
    console.log('user cancelled login');
  };
});