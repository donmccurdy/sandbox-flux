'use strict';

describe('Service: history', function () {

  // load the service's module
  beforeEach(function () {
    module('wdiApp', function ($provide) {
      $provide.service('$route', function () {
        this.current = {};
      });
    });
  });

  // instantiate service
  var history;
  beforeEach(inject(function (_history_) {
    history = _history_;
  }));

  it('should just exist', function () {
    expect(history).toBeTruthy();
  });

});
