'use strict';

/**
 * @ngdoc service
 * @name sandboxFluxApp.dispatcher
 * @description
 * # dispatcher
 * Factory in the sandboxFluxApp.
 */
angular.module('sandboxFluxApp')
	.factory('dispatcher', function () {
		return new Flux.Dispatcher();
	});
