// Login service
'use strict';

/**
 * Service for validation of user credentials
 */
login.service('LoginService', function LoginService($state, $cookies) {
  /**
   * Service that logs user
   */
  this.login = function () {
    // This return statement will be replace with a service.
    $cookies.session = 'lorem123456';
    return true;
  };

  /**
   * Service that validates if user is logged in
   */
  this.isLogged = function () {
    // This return statement will be replace with a service.
    if($cookies.session && $cookies.session.length > 0) {
      return true;
    }
    return false;
  };

  /**
   * Service to logout or kill the user session
   */
  this.logout = function () {
    var didLogout = true;
    // This conditional will be replace with a service.
    if(didLogout) {
      $cookies.session = '';
      $state.go('home');
    } else {
      $log.error('The user doesn\'t wanna go...');
    };
  };
});