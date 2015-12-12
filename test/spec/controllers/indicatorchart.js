'use strict';

describe('Controller: IndicatorChartCtrl', function () {

  // load the controller's module
  beforeEach(module('wdiApp'));

  var indicatorChartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    indicatorChartCtrl = $controller('IndicatorChartCtrl', {
      $scope: scope,
      $attrs: {}
    });
  }));

  it('should just exist', function () {
    expect(indicatorChartCtrl).toBeTruthy();
  });
});
