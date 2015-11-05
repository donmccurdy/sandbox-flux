'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
	.controller('NavigationCtrl', function ($scope, $location, $timeout, $mdSidenav) {
		$scope.toggleNavigation = _.debounce(function () {
			$timeout(function () {
				$mdSidenav('navigation').toggle();
			});
		}, 200);

		$scope.isActive = function (path) {
			return path === $location.path();
		};

		$scope.openMenu = function($mdOpenMenu, ev) {
			$mdOpenMenu(ev);
		};
	});

