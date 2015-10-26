'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('sandboxFluxApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      store: {
        pressed: false,
        addListener: function () {}
      }
    });
  }));

  it('should be initialized with button state', function () {
    expect(scope.pressed).toBe(false);
  });
});
