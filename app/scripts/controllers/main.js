'use strict';

/**
 * @ngdoc function
 * @name sandboxFluxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandboxFluxApp
 */
angular.module('sandboxFluxApp')
	.controller('MainCtrl', function ($scope, $http, CountryStore) {
		var ENDPOINT = 'http://api.worldbank.org/countries/{countries}/indicators/{indicator}',
			DEFAULT_COUNTRY = '1w',
			DEFAULT_INDICATOR = 'SP.POP.TOTL';

		/* Chart data
		**************************************/

		$scope.countries = [DEFAULT_COUNTRY];
		$scope.series = [DEFAULT_COUNTRY + ' ' + DEFAULT_INDICATOR];
		$scope.data = [];
		$scope.labels = [];

		/* Render
		**************************************/

		var update = function () {
			$scope.countries = CountryStore.selected || DEFAULT_COUNTRY;

			var endpoint = ENDPOINT
				.replace('{countries}', $scope.countries.join(';') || DEFAULT_COUNTRY)
				.replace('{indicator}', DEFAULT_INDICATOR);

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

					$scope.series = _.map(series, function (_, key) {
						return key + ' ' + DEFAULT_INDICATOR;
					});
					$scope.data = _.map(series, function (rows) {
						return _.map(_.pluck(rows, 'value'), Number);
					});
					$scope.labels = _.pluck(_.values(series)[0], 'date');
				})
				.catch(console.error.bind(console));
		};
		update();

		/* Store bindings
		**************************************/

		var tokens = [
			CountryStore.addListener(update)
		];

		$scope.$on('$destroy', function () {
			_.forEach(tokens, function (token) {
				token.remove();
			});
		});
	});
