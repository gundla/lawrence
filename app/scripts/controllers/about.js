'use strict';

/**
 * @ngdoc function
 * @name lawrenceApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the lawrenceApp
 */
angular.module('lawrenceApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
