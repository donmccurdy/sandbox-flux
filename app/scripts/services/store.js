'use strict';

/**
 * @ngdoc service
 * @name sandboxFluxApp.store
 * @description
 * # store
 * Factory in the sandboxFluxApp.
 */
angular.module('sandboxFluxApp')
	.factory('store', function ($http, dispatcher, RESOURCES, ACTIONS) {

		var callbacks = [];

		var Store = function (dispatcher) {
			this.pressed = 0;
			this.polls = [];

			this.dispatchToken = dispatcher.register(this.__handler.bind(this));
		};

		Store.prototype.addListener = function (fn) {
			callbacks.push(fn);
			return this.__createToken(fn);
		};

		Store.prototype.getDispatcher = function () {
			return dispatcher;
		};

		Store.prototype.__handler = function (payload) {
			if (payload.actionType === ACTIONS.BUTTON_UPDATE) {
				this.pressed++;
			} else if (payload.actionType === ACTIONS.POLL_UPDATE) {
				this.polls = payload.polls;
			}
			this.__emitChange();
		};

		Store.prototype.__emitChange = function () {
			callbacks.forEach(function (callback) {
				callback();
			});
		};

		Store.prototype.__createToken = function (fn) {
			var token = {};
			token.remove = function () {
				callbacks = callbacks.filter(function (callback) {
					return callback !== fn;
				});
			};
			return token;
		};

		// TODO: This isn't the right place for this.
		$http.get(RESOURCES.API + '/questions')
			.then(function (response) {
				dispatcher.dispatch({
					actionType: ACTIONS.POLL_UPDATE,
					polls: response.data
				});
			});

		return new Store(dispatcher);
	});
