// Apps module
'use strict';

/**
 * Service for validation of user credentials
 */
login.service('LoginService', function LoginService($state, $cookies) {
  /**
   * Service to login user
   */
  this.logUser = function (credentials) {
    $cookies.session = 'lorem123456';
    return true;
  };

  /**
   * Service to logout or kill the user session
   */
  this.logout = function () {
    var didLogout = true;

    if(didLogout) {
      $cookies.session = '';
      $state.go('home');
    } else {
      $log.error('The user doesn\'t wanna go...');
    };
  };
});