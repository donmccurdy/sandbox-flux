'use strict';

describe('Service: Store', function () {

  // load the service's module
  beforeEach(module('wdiApp'));

  // instantiate service
  var Store;
  beforeEach(inject(function (_Store_) {
    Store = _Store_;
  }));

  it('should just exist', function () {
    expect(Store).toBeTruthy();
  });

});
