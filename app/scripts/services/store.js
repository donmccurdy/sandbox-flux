'use strict';

/**
 * @ngdoc service
 * @name sandboxFluxApp.store
 * @description
 * # store
 * Factory in the sandboxFluxApp.
 */
angular.module('sandboxFluxApp')
  .factory('store', function (dispatcher) {
    var Store = function (dispatcher) {
      this.dispatcher = dispatcher;
      this.pressed = false;
      this.callbacks = [];
      this.dispatchToken = dispatcher.register(this.__handler.bind(this));
    };

    Store.prototype.addListener = function (fn) {
      this.callbacks.push(fn);
    };

    Store.prototype.getDispatcher = function () {
      return dispatcher;
    };

    Store.prototype.__handler = function (payload) {
      if (payload.actionType === 'button-update') {
        this.pressed = payload.pressed;
      }
      this.__emitChange();
    };

    Store.prototype.__emitChange = function () {
      this.callbacks.forEach(function (callback) {
        callback();
      });
    };

    return new Store(dispatcher);
  });
