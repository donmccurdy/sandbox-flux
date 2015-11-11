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
+	'<blockquote class="indicator-notes">'
+		'{{ indicator.attributes.sourceNote }}'
+	'</blockquote>'
+	'<p class="indicator-source">'
+		'{{ indicator.attributes.sourceOrganization }}'
+	'</p>',
			restrict: 'E',
			scope: {indicator: '='},
			controller: 'IndicatorChartCtrl'
		};
	});
