'use strict';

/**
 * @ngdoc service
 * @name sandboxFluxApp.CountryStore
 * @description
 * # CountryStore
 * Factory in the sandboxFluxApp.
 */
angular.module('sandboxFluxApp')
	.factory('CountryStore', function (Store, ACTIONS) {

		var Country = Parse.Object.extend('Country');

		var CountryStore = function () {
			Store.call(this);
			this.__type = 'CountryStore';
			this.countries = [];
			this.selected = [];
			this.init();
		};

		CountryStore.prototype = new Store();
		CountryStore.constructor = CountryStore;

		CountryStore.prototype.__handler = function (payload) {
			switch (payload.actionType) {
				case ACTIONS.COUNTRY_UPDATE:
					this.countries = payload.countries;
					break;
				case ACTIONS.COUNTRY_SELECT:
					this.selected = payload.selected;
					break;
				default:
					return;
			}
			this.__emitChange();
		};

		var instance = new CountryStore();

		var query = new Parse.Query(Country);
		query
			.limit(300)
			.find()
			.then(function (countries) {
				instance.getDispatcher().dispatch({
					actionType: ACTIONS.COUNTRY_UPDATE,
					countries: _(countries)
												.filter('attributes.location')
												.sortBy('attributes.name')
												.value()
				});
			})
			.fail(console.error.bind(console));

		return instance;
	});
