// Apps module
'use strict';

var parking = angular.module('parking', [
    'ui.router',
    'login.module'
  ]).config(function ($urlRouterProvider, $stateProvider) {
    // When no url finds a match redirect to /
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/'
      });
  });