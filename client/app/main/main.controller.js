'use strict';

angular.module('as2App')
  .controller('MainCtrl', ['$scope','Info', 'ipCookie','$location', '$route','Area','Infotype',
       function($scope,Info,ipCookie,$location,$route,Area,Infotype) {
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
             $location.path('/');
             $scope.infotypes = infotypes;
             $scope.needshow = infotypes;
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
              for(var key in $scope.user.love){
                for(var lkey in $scope.infotypes){
                  if($scope.infotypes[lkey]._id == $scope.user.love[key].infotype){
                    $scope.needshow.push($scope.infotypes[lkey]);
                  }
                }
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
    $scope.addInfo = function(){
       var info = {
            title: $scope.newInfo.title,
            content: $scope.newInfo.content,
            infotype: $scope.newInfo.infotype
            };
       Info.addInfo(info)
          .success(function(added_info) {
             $scope.newInfo = {};
             $location.path('/infotypes/'+ added_info.infotype);
          });
    }
    $scope.getuserneedView = function(num){
                if(num == 0){
                  var query1 = new Object();
                  query1.api = 'infotype';
                  query1.type = 'view';
                  query1.auth = $scope.user.auth;
                  query1.content = 0;
                  Infotype.getuserneedView(query1,'').success(function(view) {
                    $scope.needshow = view;
                  }).error(function(err){
                    alert(err);
                    $location.path('/');
                    $route.reload();
                  });
                }
                if(num == 1){
                  var query2 = new Object();
                  query2.api = 'infotype';
                  query2.type = 'view';
                  query2.auth = $scope.user.auth;
                  query2.content = 1;
                  var h = 1;
                  for(var keyb in $scope.user.love){
                    var b = $scope.user.love[keyb].infotype;
                    query2['view'+h] = b;
                    h += 1;
                  }
                  Infotype.getuserneedView(query2).success(function(view) {
                    $scope.needshow = view;
                  }).error(function(err){
                    alert(err);
                    $location.path('/');
                    $route.reload();
                  });
                }
              }
}]) 