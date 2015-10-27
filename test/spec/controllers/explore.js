'use strict';

describe('Controller: ExploreCtrl', function () {

  // load the controller's module
  beforeEach(module('sandboxFluxApp'));

  var ExploreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExploreCtrl = $controller('ExploreCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should just chill or whatever', function () {
    expect(true).toBe(true);
  });
});
