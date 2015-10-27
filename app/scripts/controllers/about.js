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

		/* Chart.js demo
		************************************/

		$scope.labels = [
			'January', 'February', 'March', 'April', 'May', 'June', 'July'
		];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};

	});
