'use strict';

/**
 * @ngdoc service
 * @name wdiApp.IndicatorStore
 * @description
 * # IndicatorStore
 * Factory in the wdiApp.
 */
angular.module('wdiApp')
	.factory('IndicatorStore', function (Store) {

		var Indicator = Parse.Object.extend('Indicator');

		var IndicatorStore = function () {
			Store.call(this);
			this.__type = 'IndicatorStore';
			this.__indicators = {};
			this.__topics = {};
			this.init();
		};

		IndicatorStore.prototype = new Store();
		IndicatorStore.constructor = IndicatorStore;

		IndicatorStore.prototype.__handler = function (payload) {
			switch (payload.actionType) {
				default:
					return;
			}
			this.__emitChange();
		};

		/**
		 * Return the Indicator for the given key.
		 * @param  {string} key
		 * @return {Promise<Indicator>}
		 */
		IndicatorStore.prototype.get = function (key) {
			if (key in this.__indicators) {
				return Parse.Promise.as(this.__indicators[key]);
			}

			var query = new Parse.Query(Indicator);
			return query
				.equalTo('key', key)
				.find()
				.then(function (indicators) {
					this.__indicators[key] = _.first(indicators);
					return this.__indicators[key];
				}.bind(this))
				.fail(console.error.bind(console));
		};

		/**
		 * Returns a list of Indicators for the given Topic.
		 * @param  {Topic} topic
		 * @return {Promise<Array<Indicator>>}
		 */
		IndicatorStore.prototype.getByTopic = function (topic) {
			if (this.__topics[topic.objectId]) {
				console.error('Cached topic not implemented.');
			}

			var query = new Parse.Query(Indicator);
			return query
				.containsAll('topics', [topic])
				.find()
				.then(function (indicators) {
					console.log(indicators);
					// TODO
				})
				.fail(console.error.bind(console));
		};

		return new IndicatorStore();
	});
