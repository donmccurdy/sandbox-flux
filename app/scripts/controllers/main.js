'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('MainCtrl', function ($scope) {
		$scope.indicators = ['SP.POP.TOTL', 'SL.TLF.TOTL.IN'];
	});
