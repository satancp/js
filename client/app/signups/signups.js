'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signups', {
        templateUrl: 'app/signups/signups.html',
        controller: 'SignupsCtrl'
      });
  });
