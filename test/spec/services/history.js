'use strict';

describe('Service: history', function () {

	var history,
		$routeMock;

	// load the service's module
	beforeEach(function () {
		module('wdiApp', function ($provide) {
			$provide.service('$route', function () {
				this.current = {};
				this.updateParams = jasmine.createSpy('updateParams');
				$routeMock = this;
			});
		});
	});

	// instantiate service
	beforeEach(inject(function (_history_) {
		history = _history_;
	}));

	it('should start with US/CA and no indicators', function () {
		expect(history).toBeDefined();
		expect(history.get('countries')).toEqual(['USA', 'CAN']);
		expect(history.get('indicators')).toEqual([]);
	});

	it('should support get/set methods', function () {
		history.set('countries', ['JPN']);
		expect(history.get('countries')).toEqual(['JPN']);

		history.set('indicators', ['a62t39']);
		expect(history.get('indicators')).toEqual(['a62t39']);

		history.set('indicators', []);
		expect(history.get('indicators')).toEqual([]);
	});

	it('should throw for unknown keys', function () {
		expect(function () { history.get('foo'); }).toThrow();
		expect(function () { history.set('bar', 'baz'); }).toThrow();
	});

	it('should publish on change', function () {
		expect($routeMock.updateParams).not.toHaveBeenCalled();
		history.set('countries', ['Ithaca']);
		expect($routeMock.updateParams).toHaveBeenCalledWith({
			countries: ['Ithaca'],
			indicators: []
		});
	});

});
