// Apps module
'use strict';

var parking = angular.module('parking', [
    'ui.router',
    'common.module',
    'home.module',
    'login.module',
    'ngCookies'
  ]).config(function ($urlRouterProvider, $stateProvider) {
    // When no url finds a match redirect to /
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        controllerAs : 'home',
        controller : 'homeCtrl',
        templateUrl : 'views/home/home.html',
        url : '/'
      });
  });
