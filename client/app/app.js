'use strict';

angular.module('as2App', [
  'ngCookies',
  'ngAnimate',
  'ngResource',
  'ngSanitize',
  'ngDropdowns',
  'ngTable',
  'ipCookie',
  'angularCombine',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });