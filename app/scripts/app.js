'use strict';

/**
 * @ngdoc overview
 * @name sandboxFluxApp
 * @description
 * # sandboxFluxApp
 *
 * Main module of the application.
 */
angular
	.module('sandboxFluxApp', [
		'ngAnimate',
		'ngCookies',
		'ngMaterial',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'chart.js'
	])
	.constant('RESOURCES', {
		API: 'http://private-24e9-sandboxflux.apiary-mock.com'
	})
	.constant('ACTIONS', {
		BUTTON_UPDATE: 'button-update'
	})
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about'
			})
			.when('/explore', {
				templateUrl: 'views/explore.html',
				controller: 'ExploreCtrl',
				controllerAs: 'explore'
			})
			.otherwise({
				redirectTo: '/'
			});
	})
	.config(function ($mdThemingProvider) {
		$mdThemingProvider.theme('default');
	});
