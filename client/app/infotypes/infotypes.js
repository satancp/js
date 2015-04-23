'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/infotypes/:infotype_id', {
        templateUrl: 'app/infotypes/infotypes.html',
        controller: 'InfotypesCtrl'
      });
  });
