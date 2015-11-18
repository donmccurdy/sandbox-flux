'use strict';

/**
 * @ngdoc service
 * @name wdiApp.Store
 * @description
 * # Store
 * Factory in the wdiApp.
 *
 * Stores contain the application state and logic. Their role is somewhat
 * similar to a model in a traditional MVC, but they manage the state of many
 * objects — they do not represent a single record of data like ORM models do.
 *
 * A store registers itself with the dispatcher and provides it with a
 * callback. This callback receives the action as a parameter. Within the
 * store's registered callback, a switch statement based on the action's type
 * is used to interpret the action and to provide the proper hooks into the
 * store's internal methods. This allows an action to result in an update to
 * the state of the store, via the dispatcher. After the stores are updated,
 * they broadcast an event declaring that their state has changed, so the
 * views may query the new state and update themselves.
 *
 * Reference: https://facebook.github.io/flux/docs/overview.html
 */
angular.module('wdiApp')
	.factory('Store', function ($timeout, dispatcher) {

		/** 
		 * Constructs and registers an instance of this store with the given
		 * dispatcher.
		 */
		var Store = function () {
			this.__callbacks = [];
			this.__type = 'Store';
		};

		/**
		 * Binds the handler for the current instance. Instances are
		 * responsible for invoking this function during construction.
		 */
		Store.prototype.init = function () {
			this.dispatchToken = dispatcher.register(this.__handler.bind(this));
		};

		/**
		 * Adds a listener to the store, when the store changes the given
		 * callback will be called. A token is returned that can be used to
		 * remove the listener. Calling the remove() function on the returned
		 * token will remove the listener.
		 *
		 * @param {Function} Callback to be invoked when store changes.
		 * @return {DispatchToken} Token that may be used to remove listener.
		 */
		Store.prototype.addListener = function (fn) {
			this.__callbacks.push(fn);
			return this.__createToken(fn);
		};

		/**
		 * Returns the dispatcher this store is registered with.
		 *
		 * @return {Dispatcher}
		 */
		Store.prototype.getDispatcher = function () {
			return dispatcher;
		};

		/**
		 * Returns the dispatch token that the dispatcher recognizes this
		 * store by. Can be used to waitFor() this store.
		 *
		 * @return {DispatchToken}
		 */
		Store.prototype.getDispatchToken = function () {
			return this.dispatchToken;
		};

		/**
		 * Subclasses must override this method. This is how the store
		 * receives actions from the dispatcher. All state mutation logic
		 * must be done during this method.
		 *
		 * @param {Object} payload
		 */
		Store.prototype.__handler = function () {
			throw new Error('Store::__handler() not implemented.');
		};

		/**
		 * Emit an event notifying all listeners that this store has changed.
		 * This can only be invoked when dispatching. Changes are
		 * de-duplicated and resolved at the end of this store's __onDispatch
		 * function.
		 */
		Store.prototype.__emitChange = function () {
			var callbacks = this.__callbacks;
			$timeout(function () {
				callbacks.forEach(function (callback) {
					callback();
				});
			});
		};

		/**
		 * [Unofficial] Helper function to create DispatchToken instances.
		 * 
		 * @param  {Function} fn [description]
		 * @return {[type]}      [description]
		 */
		Store.prototype.__createToken = function (fn) {
			var callbacks = this.__callbacks;
			return {
				remove: function () {
					_.pull(callbacks, fn);
				}
			};
		};

		/**
		 * [Unofficial] Helper function to inject support for the AngularJS
		 * digest cycle in a Promise resolution chain.
		 *
		 * @param  {Object} result Data to fulfill promise.
		 * @return {Parse.Promise}
		 */
		Store.prototype.__digest = function (result) {
			var promise = new Parse.Promise();
			$timeout(function () { promise.resolve(result); });
			return promise;
		};

		return Store;
	});
