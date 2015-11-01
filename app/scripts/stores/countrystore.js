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
      this.init();
    };

    CountryStore.prototype = new Store();
    CountryStore.constructor = CountryStore;

    CountryStore.prototype.__handler = function (payload) {
      switch (payload.actionType) {
        case ACTIONS.COUNTRY_UPDATE:
          this.countries = payload.countries;
          break;
        default:
          return;
      }
      this.__emitChange();
    };

    var instance = new CountryStore();
    var query = new Parse.Query(Country);
    query.find({
      success: function (countries) {
        instance.getDispatcher().dispatch({
          actionType: ACTIONS.COUNTRY_UPDATE,
          countries: countries
        });
      },
      error: console.error.bind(console)
    });

    return instance;
  });
