'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/infos/:info_id/comments', {
        templateUrl: 'app/comments/comments.html',
        controller: 'CommentsCtrl'
      });
  });
