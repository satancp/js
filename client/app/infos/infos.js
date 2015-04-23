'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/infos', {
        templateUrl: 'app/infos/infos.html',
        controller: 'InfosCtrl'
      });
  });
