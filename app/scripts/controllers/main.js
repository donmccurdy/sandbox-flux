'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
	.controller('MainCtrl', function ($scope, history, SelectionStore, ACTIONS) {
		$scope.countries = SelectionStore.countries();
		$scope.indicators = SelectionStore.indicators();

		// Re-publish history state when the controller loads, as state may
		// have been dropped from the URL on other pages.
		history.publish();

		$scope.remove = function (indicator) {
			SelectionStore.getDispatcher().dispatch({
				actionType: ACTIONS.INDICATOR_DESELECT,
				indicator: indicator
			});
		};

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
