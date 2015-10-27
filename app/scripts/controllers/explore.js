'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('ExploreCtrl', function ($scope, store) {

		/* Chart.js demo
		************************************/

		this.updatePolls = function () {
			var question = _.first(store.polls);
			if (question) {
				$scope.labels = _.pluck(question.choices, 'choice');
				$scope.data = [ _.pluck(question.choices, 'votes') ];
				$scope.series = [ question.question ];
			}
		};

		var storeToken = store.addListener(this.updatePolls.bind(this));
		$scope.$on('$destroy', function () {
			storeToken.remove();
		});

		this.updatePolls();
	});
