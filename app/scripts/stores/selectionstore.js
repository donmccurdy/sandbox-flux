'use strict';

/**
 * @ngdoc service
 * @name wdiApp.SelectionStore
 * @description
 * # SelectionStore
 * Factory in the wdiApp.
 */
angular.module('wdiApp')
	.factory('SelectionStore', function (Store, IndicatorStore, CountryStore, history, ACTIONS) {

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
					history.set('countries', _.pluck(this.__countries, 'attributes.key'));
					break;
				case ACTIONS.COUNTRY_SELECT:
					this.__countries.push(payload.country);
					history.set('countries', _.pluck(this.__countries, 'attributes.key'));
					break;
				case ACTIONS.COUNTRY_DESELECT:
					_.remove(this.__countries, payload.country);
					history.set('countries', _.pluck(this.__countries, 'attributes.key'));
					break;
				case ACTIONS.INDICATOR_SET_SELECTED:
					this.__indicators = payload.selected;
					history.set('indicators', _.pluck(this.__indicators, 'attributes.key'));
					break;
				case ACTIONS.INDICATOR_SELECT:
					this.__indicators.push(payload.indicator);
					history.set('indicators', _.pluck(this.__indicators, 'attributes.key'));
					break;
				case ACTIONS.INDICATOR_DESELECT:
					_.remove(this.__indicators, payload.indicator);
					history.set('indicators', _.pluck(this.__indicators, 'attributes.key'));
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

		var instance = new SelectionStore();

		CountryStore.addListener(_.once(function () {
			instance.getDispatcher().dispatch({
				actionType: ACTIONS.COUNTRY_SET_SELECTED,
				selected: _.map(history.get('countries'), function (key) {
					return CountryStore.get(key);
				})
			});
		}));

		Parse.Promise
			.when(_.map(history.get('indicators'), function (key) {
				return IndicatorStore.get(key);
			}))
			.then(function () {
				instance.getDispatcher().dispatch({
					actionType: ACTIONS.INDICATOR_SET_SELECTED,
					selected: _.toArray(arguments)
				});
			});

		return instance;
	});
