'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/areas/:id', {
        templateUrl: 'app/areas/areas.html',
        controller: 'AreasCtrl'
      });
  });
