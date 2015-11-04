'use strict';

/**
 * @ngdoc directive
 * @name sandboxFluxApp.directive:indicatorChart
 * @description
 * # indicatorChart
 */
angular.module('sandboxFluxApp')
	.directive('indicatorChart', function () {
		return {
			template: ''
+	'<div class="row">'
+		'<canvas class="chart chart-line"'
+						'chart-data="data"'
+						'chart-labels="labels"'
+						'chart-series="series"'
+						'chart-legend="true"'
+						'chart-options="{'
+							'scaleBeginAtZero: true,'
+							'scaleShowVerticalLines: false'
+						'}"></canvas>'
+	'</div>',
			restrict: 'E',
			scope: {chartIndicator: '@'},
			controller: 'IndicatorChartCtrl'
		};
	});
