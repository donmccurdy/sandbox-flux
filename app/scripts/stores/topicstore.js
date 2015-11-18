'use strict';

/**
 * @ngdoc service
 * @name wdiApp.TopicStore
 * @description
 * # TopicStore
 * Factory in the wdiApp.
 */
angular.module('wdiApp')
	.factory('TopicStore', function (Store, ACTIONS) {

		var Topic = Parse.Object.extend('Topic');

		var TopicStore = function () {
			Store.call(this);
			this.__type = 'TopicStore';
			this.__topics = [];
			this.init();
		};

		TopicStore.prototype = new Store();
		TopicStore.constructor = TopicStore;

		TopicStore.prototype.__handler = function (payload) {
			switch (payload.actionType) {
				case ACTIONS.TOPIC_UPDATE:
					this.__topics = payload.topics;
					break;
				default:
					return;
			}
			this.__emitChange();
		};

		/**
		 * Returns the Topic instance for the given key.
		 * @param  {string} key
		 * @return {Topic}
		 */
		TopicStore.prototype.get = function (key) {
			return this.__topics[key];
		};

		/**
		 * Returns a list of all Topic instances.
		 * @return {Array<Topic>}
		 */
		TopicStore.prototype.all = function () {
			return _.values(this.__topics);
		};

		var instance = new TopicStore();

		var query = new Parse.Query(Topic);
		query.find().then(function (topics) {
			instance.getDispatcher().dispatch({
				actionType: ACTIONS.TOPIC_UPDATE,
				topics: topics
			});
		}).fail(console.error.bind(console));

		return instance;
	});
