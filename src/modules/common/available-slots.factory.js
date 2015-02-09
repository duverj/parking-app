// Factory that stores all the data related to available parking lots
'use strict';

common.factory('SlotsFactory', function ($http, $q, $log, $timeout) {
  var factory = {},
    totalSlots = 10,
    spotsUrl = '/spots',
    availableSlots = 0;

  factory.spots = [];

  // Factory Init
  factory.init = function () {
    this.getData(spotsUrl)
      .then(angular.bind(this, function (data) {
        factory.spots = data;
        factory.setAvailableSlots();
      }));
  }

  // Available slots
  factory.setAvailableSlots = function () {
    var parkingList = factory.spots.length,
      count = 0;

    for (var i = 0; i < parkingList; i++) {
      count += (factory.spots[i].active) ? 1 : 0;
    };

    availableSlots = count;
  };

  factory.getAvailableSlots = function () {
    return availableSlots;
  };

  factory.assignSlot = function (plate) {
    var str;

    plate = plate.replace(/\s/g, '');

    for (var i = 0; i < factory.spots.length; i++) {
      str = factory.spots[i].plate.replace(/\s/g, '');
      if (plate == str) {
          if (!factory.spots[i].active) {
            factory.spots[i].active = true;
          }else{
            factory.spots[i].active = false;
          };
          factory.setAvailableSlots();
      };
    };
  };

  // Http Request to parking users object
  factory.getData = function () {
    var defer = $q.defer();

    $http.get(spotsUrl)
      .success(function(data) {
        defer.resolve(data);
      })
      .error(function() {
        defer.reject();
      });

    return defer.promise;
  };

  // return factory object
  return factory;
});