'use strict';

describe('Service: dispatcher', function () {

	// load the service's module
	beforeEach(module('wdiApp'));

	// instantiate service
	var dispatcher;
	beforeEach(inject(function (_dispatcher_) {
		dispatcher = _dispatcher_;
	}));

	it('should just exist', function () {
		expect(dispatcher).toBeTruthy();
	});

});
