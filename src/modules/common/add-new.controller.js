// Controller to manage events related to new user insert
'use strict';
 
common.controller('addNewCtrl', function ($scope, $log){
  
  $scope.saveNew = function() {
    $log.info('Saving new..');
  };

});