'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('AboutCtrl', function ($scope, store) {
		$scope.pressed = store.pressed;
		var storeToken = store.addListener(function () {
			$scope.pressed = store.pressed;
		});

		$scope.$on('$destroy', function () {
			storeToken.remove();
		});
	});
