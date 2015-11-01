'use strict';

describe('Controller: NavigationCtrl', function () {

  // load the controller's module
  beforeEach(module('sandboxFluxApp'));

  // override _.debounce
  beforeEach(function () {
    _.debounce = function (callback) { return callback; };
  });

  var NavigationCtrl,
    isOpen,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    isOpen = false;
    NavigationCtrl = $controller('NavigationCtrl', {
      $scope: scope,
      $timeout: function (f) { f(); },
      $mdSidenav: function () {
        return {
          toggle: function () { isOpen = !isOpen; }
        };
      }
    });
  }));

  it('should toggle navigation open and closed', function () {
    expect(isOpen).toBe(false);
    scope.toggleNavigation();
    expect(isOpen).toBe(true);
  });
});
