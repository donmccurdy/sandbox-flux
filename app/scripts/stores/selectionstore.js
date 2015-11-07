'use strict';

/**
 * @ngdoc service
 * @name wdiApp.SelectionStore
 * @description
 * # SelectionStore
 * Factory in the wdiApp.
 */
angular.module('wdiApp')
	.factory('SelectionStore', function (Store, IndicatorStore, CountryStore, ACTIONS) {

		var SelectionStore = function () {
			Store.call(this);
			this.__type = 'SelectionStore';
			this.__countries = [];
			this.__indicators = [];
			this.init();
		};

		SelectionStore.prototype = new Store();
		SelectionStore.constructor = SelectionStore;

		SelectionStore.prototype.__handler = function (payload) {
			switch (payload.actionType) {
				case ACTIONS.COUNTRY_SET_SELECTED:
					this.__countries = payload.selected;
					break;
				case ACTIONS.COUNTRY_SELECT:
					this.__countries.push(payload.country);
					break;
				case ACTIONS.COUNTRY_DESELECT:
					this.__countries = _.remove(this.__countries, payload.country);
					break;
				case ACTIONS.INDICATOR_SELECT:
					this.__indicators.push(payload.indicator);
					break;
				case ACTIONS.INDICATOR_DESELECT:
					this.__indicators = _.remove(this.__indicators, payload.indicator);
					break;
				default:
					return;
			}
			this.__emitChange();
		};

		SelectionStore.prototype.countries = function () {
			return this.__countries;
		};

		SelectionStore.prototype.indicators = function () {
			return this.__indicators;
		};

		return new SelectionStore();
	});
