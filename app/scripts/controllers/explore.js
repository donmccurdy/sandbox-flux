'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('ExploreCtrl', function ($scope, $http, RESOURCES) {
		/* Chart.js demo
		************************************/
		$http.get(RESOURCES.API + '/questions')
			.then(function (response) {
				var question = _.first(response.data);
				$scope.labels = _.pluck(question.choices, 'choice');
				$scope.data = [ _.pluck(question.choices, 'votes') ];
				$scope.series = [ question.question ];
			});
	});
