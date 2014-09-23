'use strict';

/**
 * @ngdoc overview
 * @name lawrenceApp
 * @description
 * # lawrenceApp
 *
 * Main module of the application.
 */
angular
  .module('lawrenceApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'my.directive.autocomplete',
    'my.directive.multivalue.autocomplete'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
