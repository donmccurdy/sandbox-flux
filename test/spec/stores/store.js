'use strict';

describe('Service: Store', function () {

	// load the service's module
	beforeEach(module('wdiApp'));

	// instantiate service
	var Store, store, dispatcher, $timeout;
	beforeEach(inject(function (_Store_, _dispatcher_, _$timeout_) {
		Store = _Store_;
		dispatcher = _dispatcher_;
		$timeout = _$timeout_;

		var TestStore = function () {
			_Store_.call(this);
			this.init();
		};
		TestStore.prototype = new Store();
		TestStore.constructor = TestStore;
		TestStore.prototype.__handler = jasmine.createSpy('__handler');
		store = new TestStore();
	}));

	it('should have a dispatch token', function () {
		expect(store.dispatchToken).toBeTruthy();
	});

	it('should provide an accessor for the dispatch token', function () {
		expect(store.getDispatchToken).toBeTruthy();
	});

	it('should provide an accessor for the dispatcher', function () {
		expect(store.getDispatcher()).toBe(dispatcher);
	});

	it('should update listeners when a change is emitted', function () {
		var listener = jasmine.createSpy('listener');
		store.addListener(listener);
		store.__emitChange();
		$timeout.flush();
		expect(listener).toHaveBeenCalled();
	});

	it('should remove listeners when removed by the dispatch token', function () {
		var listener1 = jasmine.createSpy('listener1'),
			listener2 = jasmine.createSpy('listener2');

		var token = store.addListener(listener1);
		store.addListener(listener2);

		// By current implementation, listeners are iterated during the digest
		// cycle, not before.
		store.__emitChange();
		token.remove();
		$timeout.flush();

		expect(listener1).not.toHaveBeenCalled();
		expect(listener2).toHaveBeenCalled();
	});

});
