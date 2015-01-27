// Parking Slot Controller
'use-strict';

common.controller('parkingSlotCtrl', function (SpotsService) {
  // Will hold parking spots info
  this.spots = undefined;

  SpotsService.getData().then(angular.bind(this, function (data) {
      this.spots = data;
    }), function () {
      console.error('An error occured while fetching parking spots information.');
    });
});