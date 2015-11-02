'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('SidebarCtrl', function ($scope, TopicStore, CountryStore, ACTIONS) {
		$scope.topics = TopicStore.topics;
		$scope.countries = CountryStore.countries;

		$scope.selectedTopic = '';
		$scope.selectedCountries = '';

		$scope.onCountryChange = function () {
			CountryStore.getDispatcher().dispatch({
				actionType: ACTIONS.COUNTRY_SELECT,
				selected: $scope.selectedCountries
			});
		};

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
