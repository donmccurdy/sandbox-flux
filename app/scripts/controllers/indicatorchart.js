'use strict';

/**
 * @ngdoc function
 * @name wdiApp.controller:IndicatorChartCtrl
 * @description
 * # IndicatorChartCtrl
 * Controller of the wdiApp
 */
angular.module('wdiApp')
  .controller('IndicatorChartCtrl', function ($scope, $attrs, $timeout, CountryStore, SelectionStore) {
		var IndicatorCountrySeries = Parse.Object.extend('IndicatorCountrySeries');

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

			(new Parse.Query(IndicatorCountrySeries))
				.equalTo('indicatorKey', $scope.indicator.get('key'))
				.containedIn('countryKey', _.pluck($scope.countries, 'attributes.iso2Code'))
				.find()
				.then(function (rows) {
					$timeout(function () {
						var sample = function (point, i) { return i % 5 === 0; };

						if (_.isEmpty(rows)) { return; }

						$scope.data = _(rows)
							.pluck('attributes.series')
							.map(_.curry(_.pluck)(_, 'value'))
							.map(_.curry(_.filter)(_, sample))
							.value();
						$scope.labels = _(rows[0])
							.thru(function (row) { return row.get('series'); })
							.filter(sample)
							.pluck('date')
							.value();
						$scope.series = _(rows)
							.pluck('attributes.countryKey')
							.map(CountryStore.getByIso2Code, CountryStore)
							.pluck('attributes.name')
							.value();
					});
				})
				.fail(console.error.bind(console));

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
