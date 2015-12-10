'use strict';

/**
 * @ngdoc service
 * @name wdiApp.CountryStore
 * @description
 * # CountryStore
 * Factory in the wdiApp.
 */
angular.module('wdiApp')
	.factory('CountryStore', function (Store, history, ACTIONS) {

		var Country = Parse.Object.extend('Country');

		var LIMIT = 300;

		var CountryStore = function () {
			Store.call(this);
			this.__type = 'CountryStore';
			this.__countries = {};
			this.init();
		};

		CountryStore.prototype = new Store();
		CountryStore.constructor = CountryStore;

		CountryStore.prototype.__handler = function (payload) {
			switch (payload.actionType) {
				case ACTIONS.COUNTRY_UPDATE:
					this.__countries = _.indexBy(payload.countries, 'attributes.key');
					break;
				default:
					return;
			}
			this.__emitChange();
		};

		/**
		 * Returns the Country instance with the given key.
		 * @param  {string} key
		 * @return {Country}
		 */
		CountryStore.prototype.get = function (key) {
			return this.__countries[key];
		};

		/**
		 * Returns the Country instance with the given ISO2 Code.
		 * @param  {string} code
		 * @return {Country}
		 */
		CountryStore.prototype.getByIso2Code = function (code) {
			return _.find(this.__countries, function (country) {
				return country.attributes.iso2Code === code;
			});
		};

		/**
		 * Returns a list of all Country instances.
		 * @return {Array<Country>}
		 */
		CountryStore.prototype.all = function () {
			return _.values(this.__countries);
		};

		var instance = new CountryStore();

		var query = new Parse.Query(Country);
		query
			.limit(LIMIT)
			.find()
			.then(function (countries) {
				instance.getDispatcher().dispatch({
					actionType: ACTIONS.COUNTRY_UPDATE,
					countries: _(countries)
						.filter('attributes.location')
						.sortBy('attributes.name')
						.value()
				});
				instance.getDispatcher().dispatch({
					actionType: ACTIONS.COUNTRY_SET_SELECTED,
					selected: _.map(history.get('countries'), function (key) {
						return instance.get(key);
					})
				});
			})
			.fail(console.error.bind(console));

		return instance;
	});
