'use strict';

/**
 * @ngdoc service
 * @name wdiApp.dispatcher
 * @description
 * # dispatcher
 * Factory in the wdiApp.
 */
angular.module('wdiApp')
	.factory('dispatcher', function () {
		return new Flux.Dispatcher();
	});
