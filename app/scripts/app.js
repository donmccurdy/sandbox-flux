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
    'ngTouch'
  ])
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
  });
