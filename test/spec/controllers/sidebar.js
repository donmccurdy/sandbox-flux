'use strict';

describe('Controller: SidebarCtrl', function () {

	// load the controller's module
	beforeEach(module('wdiApp'));

	var sidebarCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		sidebarCtrl = $controller('SidebarCtrl', {
			$scope: scope,
			TopicStore: jasmine.createSpyObj('TopicStore', ['all', 'addListener']),
			CountryStore: jasmine.createSpyObj('CountryStore', ['all', 'addListener']),
			IndicatorStore: jasmine.createSpyObj('IndicatorStore', ['getByTopic']),
			SelectionStore: jasmine.createSpyObj('SelectionStore', ['countries', 'addListener']),
		});
	}));

	it('should just exist', function () {
		expect(!!sidebarCtrl).toBe(true);
	});
});
