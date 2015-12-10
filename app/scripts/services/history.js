'use strict';

/**
 * @ngdoc service
 * @name wdiApp.history
 * @description
 * # history
 * Service in the wdiApp.
 */
angular.module('wdiApp')
	.service('history', function ($route) {
		var KEYS = ['countries'];

		this.state = _.merge({
			countries: ['USA', 'CAN'],
		}, _.pick($route.current.params, KEYS));

		this.get = function (key) {
			this.validate(key);
			return this.state[key];
		};

		this.set = function (key, value) {
			this.validate(key);
			this.state[key] = value;
			this.publish();
			return this;
		};

		this.validate = function (key) {
			if (!_.contains(KEYS, key)) {
				throw new Error('Unexpected key ' + key);
			}
		};

		this.publish = function () {
			$route.updateParams(this.state);
		};
	});
