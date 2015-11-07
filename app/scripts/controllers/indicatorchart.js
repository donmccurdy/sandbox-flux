'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:IndicatorChartCtrl
 * @description
 * # IndicatorChartCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
  .controller('IndicatorChartCtrl', function ($scope, $attrs, $http, CountryStore, SelectionStore) {
		var ENDPOINT = 'http://api.worldbank.org/countries/{countries}/indicators/{indicator}';

		/* Chart data
		**************************************/

		$scope.countries = SelectionStore.countries();
		$scope.series = [];
		$scope.data = [];
		$scope.labels = [];

		/* Render
		**************************************/

		var update = function () {
			if (_.isEmpty($scope.countries)) {
				$scope.series = $scope.data = $scope.labels = [];
				return;
			}

			var endpoint = ENDPOINT
				.replace('{countries}', _.pluck($scope.countries, 'attributes.key').join(';'))
				.replace('{indicator}', $scope.indicator.get('key'));

			$http.jsonp(endpoint, {
				params: {format: 'jsonp', per_page: 100, prefix: 'JSON_CALLBACK'}
			})
				.then(function (response) {
					var series = _(response.data[1])
						.filter('value')
						.filter(function (row) { return row.date % 5 === 0; })
						.sortBy('date')
						.groupBy('country.id')
						.value();

					$scope.series = _.map(series, function (country, key) {
						return CountryStore.getByIso2Code(key).get('name');
					});
					$scope.data = _.map(series, function (rows) {
						return _.map(_.pluck(rows, 'value'), Number);
					});
					$scope.labels = _.pluck(_.values(series)[0], 'date');
				})
				.catch(console.error.bind(console));
		};

		if (!_.isEmpty(SelectionStore.countries())) {
			update();
		}

		/* Store bindings
		**************************************/

		var tokens = [
			SelectionStore.addListener(function () {
				var aKeys = _.pluck($scope.countries, 'attributes.key'),
					bKeys = _.pluck(SelectionStore.countries(), 'attributes.key');
				if (!_.isEqual(aKeys, bKeys)) {
					$scope.countries = SelectionStore.countries();
					update();
				}
			})
		];

		$scope.$on('$destroy', function () {
			_.forEach(tokens, function (token) {
				token.remove();
			});
		});
  });
