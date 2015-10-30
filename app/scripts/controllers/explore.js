'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('ExploreCtrl', function ($scope, $timeout, store) {

		/* Chart.js demo
		************************************/

		var updatePolls = function () {
			var poll = _.first(store.polls);
			if (poll) {
				var choices = poll.get('choices');
				$scope.labels = _.pluck(choices, 'choice');
				$scope.data = [ _.pluck(choices, 'votes') ];
				$scope.series = [ poll.get('question') ];
			}
		};

		var storeToken = store.addListener(updatePolls);
		$scope.$on('$destroy', function () {
			storeToken.remove();
		});

		updatePolls();
	});
