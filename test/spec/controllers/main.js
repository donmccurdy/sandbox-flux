'use strict';

describe('Controller: MainCtrl', function () {

	// load the controller's module
	beforeEach(module('wdiApp'));

	var mainCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		mainCtrl = $controller('MainCtrl', {
			$scope: scope,
			history: jasmine.createSpyObj('history', ['publish']),
			SelectionStore: jasmine.createSpyObj('SelectionStore', [
				'addListener', 'countries', 'indicators', 'getDispatcher'
			])
		});
	}));

	it('should just exist', function () {
		expect(mainCtrl).toBeTruthy();
	});
});
