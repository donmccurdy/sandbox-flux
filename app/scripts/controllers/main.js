'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('MainCtrl', function ($scope, store) {
		$scope.pressed = store.pressed;

		$scope.pressButton = function () {
			store.getDispatcher().dispatch({
				actionType: 'button-update',
				pressed: true
			});
		};

		store.addListener(function () {
			$scope.pressed = store.pressed;
		});

	});
