'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
	.controller('SidebarCtrl', function ($scope, TopicStore, CountryStore, ACTIONS) {
		$scope.topics = TopicStore.all();
		$scope.countries = CountryStore.all();

		$scope.selectedTopic = '';
		$scope.selectedCountries = [];

		$scope.onCountryChange = function () {
			CountryStore.getDispatcher().dispatch({
				actionType: ACTIONS.COUNTRY_SELECT,
				selected: $scope.selectedCountries
			});
		};

		var tokens = [
			TopicStore.addListener(function () { $scope.topics = TopicStore.all(); }),
			CountryStore.addListener(function () {
				$scope.countries = CountryStore.all();
				$scope.selectedCountries = CountryStore.selected();
			})
		];

		$scope.$on('$destroy', function () {
			_.forEach(tokens, function (token) {
				token.remove();
			});
		});
	});
