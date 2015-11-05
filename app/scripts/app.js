'use strict';

/**
 * @ngdoc overview
 * @name wdiApp
 * @description
 * # wdiApp
 *
 * Main module of the application.
 */
angular
	.module('wdiApp', [
		'ngAnimate',
		'ngCookies',
		'ngMaterial',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'chart.js'
	])
	.constant('ACTIONS', {
		COUNTRY_SELECT: 'country-select',
		COUNTRY_UPDATE: 'country-update',
		TOPIC_UPDATE: 'poll-update'
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
			.otherwise({
				redirectTo: '/'
			});
	})
	.config(function ($mdThemingProvider) {
		$mdThemingProvider.theme('default');
	})
	.config(function () {
		Parse.initialize(
			'1HjpKS0k6054RdvGjmEwFtCbglfycTkTIqd1k22y',
			'BTXQ11uqQEtihjZAIGMxUr8ZSdVJKXn8KadbC0iJ'
		);
	});
