'use strict';

/**
 * @ngdoc directive
 * @name wdiApp.directive:indicatorChart
 * @description
 * # indicatorChart
 */
angular.module('wdiApp')
	.directive('indicatorChart', function () {
		return {
			template: ''
+	'<h2 class="md-title">{{ indicator.attributes.name }}</h2>'
+	'<canvas class="chart chart-line"'
+					'chart-data="data"'
+					'chart-labels="labels"'
+					'chart-series="series"'
+					'chart-legend="true"'
+					'chart-options="{'
+						'scaleBeginAtZero: true,'
+						'scaleShowVerticalLines: false'
+					'}"></canvas>'
+	'<p>{{ indicator.attributes.sourceNote }}</p>'
+	'<p><i>{{ indicator.attributes.sourceOrganization }}</i></p>',
			restrict: 'E',
			scope: {chartIndicator: '@'},
			controller: 'IndicatorChartCtrl'
		};
	});
