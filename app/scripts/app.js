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
		TOPIC_UPDATE: 'topic-update',
		COUNTRY_SET_SELECTED: 'country-set-selected',
		COUNTRY_UPDATE: 'country-update',
		COUNTRY_SELECT: 'country-select',
		COUNTRY_DESELECT: 'country-deselect',
		INDICATOR_SELECT: 'indicator-select',
		INDICATOR_DESELECT: 'indicator-deselect'
	})
	.constant('FORMAT', {
		Number: function (n) {
			return (n === Number(n) && n % 1 === 0)
				? n : (Math.round(n * 100) / 100);
		}
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
		$mdThemingProvider.definePalette('sage', $mdThemingProvider.extendPalette('teal', {
			'500': '75B5AA'
		}));
		$mdThemingProvider.theme('default')
			.primaryPalette('sage');
	})
	.config(function () {
		Parse.initialize(
			'1HjpKS0k6054RdvGjmEwFtCbglfycTkTIqd1k22y',
			'BTXQ11uqQEtihjZAIGMxUr8ZSdVJKXn8KadbC0iJ'
		);
	});
