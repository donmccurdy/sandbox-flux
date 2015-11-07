'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
	.controller('MainCtrl', function ($scope, SelectionStore) {
		$scope.countries = SelectionStore.countries();
		$scope.indicators = SelectionStore.indicators();

		/* Store bindings
		**************************************/

		var tokens = [
			SelectionStore.addListener(function () {
				$scope.countries = SelectionStore.countries();
				$scope.indicators = SelectionStore.indicators();
			})
		];

		$scope.$on('$destroy', function () {
			_.forEach(tokens, function (token) {
				token.remove();
			});
		});
	});
