'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('MainCtrl', function ($scope, TopicStore, CountryStore) {
		$scope.topics = TopicStore.topics;
		$scope.countries = CountryStore.countries;

		this.topic = '';
		this.country = '';

		var tokens = [
			TopicStore.addListener(function () { $scope.topics = TopicStore.topics; }),
			CountryStore.addListener(function () { $scope.countries = CountryStore.countries; })
		];

		$scope.$on('$destroy', function () {
			_.forEach(tokens, function (token) {
				token.remove();
			});
		});
	});
