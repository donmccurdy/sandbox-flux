'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('MainCtrl', function ($scope, store, ACTIONS) {
		$scope.pressed = store.pressed;

		$scope.pressButton = function () {
			store.getDispatcher().dispatch({
				actionType: ACTIONS.BUTTON_UPDATE,
				pressed: true
			});
		};

		var storeToken = store.addListener(function () {
			$scope.pressed = store.pressed;
		});

		$scope.$on('$destroy', function () {
			storeToken.remove();
		});

	});
