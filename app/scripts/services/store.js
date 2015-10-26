'use strict';

/**
 * @ngdoc service
 * @name sandboxFluxApp.store
 * @description
 * # store
 * Factory in the sandboxFluxApp.
 */
angular.module('sandboxFluxApp')
	.factory('store', function (dispatcher) {
		var Store = function (dispatcher) {
			this.dispatcher = dispatcher;
			this.pressed = false;
			this.callbacks = [];
			this.dispatchToken = dispatcher.register(this.__handler.bind(this));
		};

		Store.prototype.addListener = function (fn) {
			this.callbacks.push(fn);
			return this.__createToken(fn);
		};

		Store.prototype.getDispatcher = function () {
			return dispatcher;
		};

		Store.prototype.__handler = function (payload) {
			if (payload.actionType === 'button-update') {
				this.pressed = payload.pressed;
			}
			this.__emitChange();
		};

		Store.prototype.__emitChange = function () {
			this.callbacks.forEach(function (callback) {
				callback();
			});
		};

		Store.prototype.__createToken = function (fn) {
			var token = {};
			token.remove = function () {
				this.callbacks = this.callbacks.filter(function (callback) {
					return callback !== fn;
				});
			}.bind(this);
			return token;
		};

		return new Store(dispatcher);
	});
