'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
	.controller('MainCtrl', function ($scope) {
		$scope.indicators = ['SP.POP.TOTL', 'SL.TLF.TOTL.IN'];
	});
