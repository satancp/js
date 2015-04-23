'use strict';

angular.module('as2App')
  .controller('InfosCtrl', ['$scope','Info', 'ipCookie','$location','$route','Area',
       function($scope,Info,ipCookie,$location,$route,Area) {
    Info.getInfos()
        .success(function(infos) {
             $scope.infos = infos;
        });
    Area.getAreas()
        .success(function(areas) {
             $scope.areas = areas;
             $scope.ddSelectOptions2 = [
        {
            text: $scope.areas[0].name,
            href: "/areas/"+ $scope.areas[0]._id
        }
    ];
        });
    Info.getInfotypes()
        .success(function(infotypes) {
             $scope.infotypes = infotypes;
             $scope.user = ipCookie('LoginUser');
             $scope.signout = function () {
              ipCookie.remove('LoginUser');
              $scope.user = undefined;
              $scope.cookie = 'invalid';
              $location.path('/');
              $route.reload();
              };
             if($scope.user != undefined){
              $scope.cookie = 'valid';
              var chat = ipCookie('Chat');
              if(chat != undefined){
                Area.deleteUser(chat,$scope.user._id);
                ipCookie.remove('Chat');
              }
              $scope.ddSelectOptions1 = [
        {
            text: 'Profile',
            href: '/users/'+ $scope.user._id
        },
        {
            text: 'Settings',
            href: '/useredits/'+ $scope.user._id
        }];
             }
             $scope.ddSelectOptions = [
        {
            text: $scope.infotypes[0].name,
            href: "/infotypes/"+ $scope.infotypes[0]._id
        },
        {
            text: $scope.infotypes[1].name,
            href: "/infotypes/"+ $scope.infotypes[1]._id
        },
        {
            text: $scope.infotypes[2].name,
            href: "/infotypes/"+ $scope.infotypes[2]._id
        },
        {
            text: $scope.infotypes[3].name,
            href: "/infotypes/"+ $scope.infotypes[3]._id
        }
    ];
        });
    $scope.incrementUpvotes = function(info) {
       Info.upvoteInfo(info._id, info.upvotes + 1 )
          .success(function(updated_info) {
              info.upvotes = updated_info.upvotes
          })
    }
}]) 