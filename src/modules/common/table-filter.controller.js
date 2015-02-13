// Controller for filter functionality
'use strict';

common.controller('tableFilterCtrl', function ($scope, $log , ngDialog) {

  this.newVehicle = function() {
    ngDialog.open({
      template:'views/common/new-vehicle.html',
      className: 'modal-container',
      controller: 'addNewCtrl',
      scope: $scope
    });
  };

});