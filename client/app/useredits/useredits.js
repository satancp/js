'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/useredits/:id', {
        templateUrl: 'app/useredits/useredits.html',
        controller: 'UsereditsCtrl'
      });
  });
