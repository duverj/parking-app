// Login service
'use strict';

/**
 * Service for validation of user credentials
 */
login.service('LoginService', function LoginService($state, $cookies) {
  /**
   * Service that validates if user is logged in
   */
  this.isLogged = function () {
    $cookies.session = 'lorem123456';
    // This return statement will be replace with a service.
    return true;
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