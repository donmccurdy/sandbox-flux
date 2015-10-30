'use strict';

/**
 * @ngdoc service
 * @name sandboxFluxApp.store
 * @description
 * # store
 * Factory in the sandboxFluxApp.
 */
angular.module('sandboxFluxApp')
	.factory('store', function ($http, $timeout, dispatcher, RESOURCES, ACTIONS) {

		var Poll = Parse.Object.extend('Poll');

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

		var query = new Parse.Query(Poll);
		query.find({
			success: function (polls) {
				$timeout(function () {
					dispatcher.dispatch({
						actionType: ACTIONS.POLL_UPDATE,
						polls: polls
					});
				});
			},
			error: console.error.bind(console)
		});

		return new Store(dispatcher);
	});
