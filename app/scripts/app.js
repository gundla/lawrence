'use strict';

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._;
});

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
    'my.directive.multivalue.autocomplete',
    'underscore'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/autocomplete', {
        templateUrl: 'views/autocomplete.html',
        controller: 'AutocompleteCtrl'
      })
      .when('/multivalue-autocomplete', {
        templateUrl: 'views/mvAutocomplete.html',
        controller: 'MVAutocompleteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
