'use strict';

describe('Controller: AboutCtrl', function () {

	// load the controller's module
	beforeEach(module('wdiApp'));

	var aboutCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		aboutCtrl = $controller('AboutCtrl', {$scope: scope});
	}));

	it('should just exist', function () {
		expect(aboutCtrl).toBeTruthy();
	});
});
