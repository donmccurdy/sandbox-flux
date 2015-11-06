'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
	.controller('MainCtrl', function ($scope, CountryStore) {
		$scope.countries = CountryStore.selected();
		$scope.indicators = ['SP.POP.TOTL', 'SL.TLF.TOTL.IN'];

		/* Store bindings
		**************************************/

		var tokens = [
			CountryStore.addListener(function () {
				$scope.countries = CountryStore.selected();
			})
		];

		$scope.$on('$destroy', function () {
			_.forEach(tokens, function (token) {
				token.remove();
			});
		});
	});
