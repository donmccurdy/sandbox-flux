'use strict';

describe('Service: TopicStore', function () {

  // load the service's module
  beforeEach(module('wdiApp'));

  // instantiate service
  var TopicStore;
  beforeEach(inject(function (_TopicStore_) {
    TopicStore = _TopicStore_;
  }));

  it('should do something', function () {
    expect(!!TopicStore).toBe(true);
  });

});
