'use strict';

angular.module('as2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/infos/:info_id/comments/:comment_id/comments', {
        templateUrl: 'app/secondcomments/secondcomments.html',
        controller: 'SecondcommentsCtrl'
      });
  });
