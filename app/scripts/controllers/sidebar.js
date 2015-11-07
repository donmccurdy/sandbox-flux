'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
	.controller('SidebarCtrl', function (
			$scope, 
			TopicStore,
			CountryStore,
			IndicatorStore,
			SelectionStore,
			ACTIONS) {
		$scope.countries = CountryStore.all();
		$scope.topics = TopicStore.all();
		$scope.indicators = [];

		$scope.selectedCountries = SelectionStore.countries();
		$scope.selectedTopic = null;
		$scope.selectedIndicator = null;
		$scope.selectedType = 'line';

		$scope.onCountryChange = function () {
			CountryStore.getDispatcher().dispatch({
				actionType: ACTIONS.COUNTRY_SET_SELECTED,
				selected: $scope.selectedCountries
			});
		};

		$scope.onTopicChange = function () {
			IndicatorStore.getByTopic($scope.selectedTopic)
				.then(function (indicators) {
					$scope.indicators = indicators;
				});
		};

		$scope.onCreate = function () {
			SelectionStore.getDispatcher().dispatch({
				actionType: ACTIONS.INDICATOR_SELECT,
				indicator: $scope.selectedIndicator
			});
		};

		var tokens = [
			TopicStore.addListener(function () { $scope.topics = TopicStore.all(); }),
			CountryStore.addListener(function () { $scope.countries = CountryStore.all(); }),
			SelectionStore.addListener(function () { $scope.selectedCountries = SelectionStore.countries(); })
		];

		$scope.$on('$destroy', function () {
			_.forEach(tokens, function (token) {
				token.remove();
			});
		});
	});
