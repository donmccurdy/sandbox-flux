'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
  .controller('NavigationCtrl', function ($scope, $mdSidenav) {
		$scope.toggleNavigation = _.debounce(function () {
			$mdSidenav('navigation').toggle();
		}, 200);
  });
