'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signins', {
        templateUrl: 'app/signins/signins.html',
        controller: 'SigninsCtrl'
      });
  });
