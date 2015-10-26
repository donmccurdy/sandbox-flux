'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('sandboxFluxApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
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
