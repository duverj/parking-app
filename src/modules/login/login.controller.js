// Login controller
'use strict';

login.controller('loginCtrl', function ($state) {
  this.methods = {};

  /**
   * Cta for user submitting the login form
   */
  this.methods.submit = function () {
    console.log('user submitted login');
  };

  /**
   * Cta for user cancelling the login form
   */
  this.methods.cancel = function () {
    console.log('user cancelled login');
  };
});