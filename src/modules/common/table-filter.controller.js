// Controller for filter functionality
'use strict';

common.controller('tableFilterCtrl', function ($log , ngDialog) {
	var self = this;

	this.newVehicle = function() {
		ngDialog.open({
			template:'views/common/new-vehicle.html',
			className: 'modal-container',
			controller: self
		});
	};

	this.saveNew = function() {
		console.log('saving!!');
	};
});