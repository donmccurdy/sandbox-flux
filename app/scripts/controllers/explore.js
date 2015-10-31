'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('ExploreCtrl', function ($scope, TopicStore) {

		$scope.topics = TopicStore.topics;

		var storeToken = TopicStore.addListener(function () {
			$scope.topics = TopicStore.topics;
		});

		$scope.$on('$destroy', function () {
			storeToken.remove();
		});
	});
