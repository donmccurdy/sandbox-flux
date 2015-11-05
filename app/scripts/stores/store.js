'use strict';

/**
 * @ngdoc service
 * @name wdiApp.Store
 * @description
 * # Store
 * Factory in the wdiApp.
 */
angular.module('wdiApp')
	.factory('Store', function ($timeout, dispatcher) {

		var Store = function () {
			this.__callbacks = [];
			this.__type = 'Store';
		};

		Store.prototype.init = function () {
			this.dispatchToken = dispatcher.register(this.__handler.bind(this));
		};

		Store.prototype.addListener = function (fn) {
			this.__callbacks.push(fn);
			return this.__createToken(fn);
		};

		Store.prototype.getDispatcher = function () {
			return dispatcher;
		};

		Store.prototype.__handler = function () {
			throw new Error('Store::__handler() not implemented.');
		};

		Store.prototype.__emitChange = function () {
			var callbacks = this.__callbacks;
			$timeout(function () {
				callbacks.forEach(function (callback) {
					callback();
				});
			});
		};

		Store.prototype.__createToken = function (fn) {
			var callbacks = this.__callbacks;
			return {
				remove: function () {
					_.pull(callbacks, fn);
				}
			};
		};

		return Store;
	});
