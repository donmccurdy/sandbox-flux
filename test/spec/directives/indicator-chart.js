'use strict';

describe('Directive: indicatorChart', function () {

	// load the directive's module
	beforeEach(function () {
		module('wdiApp', function ($controllerProvider) {
			$controllerProvider.register('IndicatorChartCtrl', function () {});
		});
	});

	var element,
		scope;

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should just exist', inject(function ($compile) {
		element = angular.element('<indicator-chart></indicator-chart>');
		element = $compile(element)(scope, function () {});
		expect(element).toBeTruthy();
	}));
});
