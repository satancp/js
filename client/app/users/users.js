'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users/:id', {
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      });
  });
