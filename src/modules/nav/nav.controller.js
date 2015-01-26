// nav controller
'use strict';

parking.controller('navCtrl', function (LoginService, $cookies) {
  this.methods = {};
  this.$cookies = $cookies;

  /**
   * Calls logout service
   */
  this.methods.logout = function () {
    LoginService.logout();
  };
});