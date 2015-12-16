'use strict';

describe('Controller: NavigationCtrl', function () {

	// load the controller's module
	beforeEach(module('wdiApp'));

	// override _.debounce
	beforeEach(function () {
		_.debounce = function (callback) { return callback; };
	});

	var navigationCtrl,
		isOpen,
		toggleSpy = jasmine.createSpy('toggle'),
		path,
		$scope,
		$location;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		$scope = $rootScope.$new();
		$location = {path: function () { return path; }};
		isOpen = false;
		navigationCtrl = $controller('NavigationCtrl', {
			$scope: $scope,
			$timeout: function (f) { f(); },
			$location: $location,
			$mdSidenav: function () { return {toggle: toggleSpy}; }
		});
	}));

	it('should toggle navigation open and closed', function () {
		expect(toggleSpy).not.toHaveBeenCalled();
		$scope.toggleNavigation();
		expect(toggleSpy).toHaveBeenCalled();
	});

	it('should mark current path as active', function () {
		path = '/mypath';
		expect($scope.isActive('/notmypath')).toBe(false);
		expect($scope.isActive('/mypath')).toBe(true);
		path = '/otherpath';
		expect($scope.isActive('/mypath')).toBe(false);
	});
});
