// Home controller
'use strict';

home.controller('homeCtrl', function (SpotsService) {
  // Will hold parking spots info
  this.spots = undefined;

  SpotsService.getData().then(angular.bind(this, function (data) {
      this.spots = data;
    }), function () {
      console.error('An error occured while fetching parking spots information.');
    });
});
