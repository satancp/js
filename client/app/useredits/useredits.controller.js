'use strict';

angular.module('as2App')
   .controller('UsereditsCtrl', ['$scope','User','Info','$location','ipCookie', '$routeParams','$route','Area',
       function($scope,User,Info,$location,ipCookie,$routeParams,$route,Area) {
       Info.getInfotypes()
        .success(function(infotypes) {
             $scope.infotypes = infotypes;
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
       User.getUser($routeParams.id).success(function (get_user) {
            $scope.user = get_user;
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
    $scope.checkbox = [];
    $scope.times = [0,0,0,0];
    $scope.select = function (t,id) {
    		if($scope.times[t] % 2 == 0){
    			var a = new Object();
                a.infotype = id;
                $scope.checkbox.push(a);
    		}
    		else{
    			for(var key in $scope.checkbox){
    			    var realkey = parseInt(key,10);
    			    if($scope.checkbox[key].infotype == id){
    			       $scope.checkbox.splice(realkey,1);
    			    }
    		    }
    		}
    	$scope.times[t] += 1;
    };
    $scope.updateuser = function () {
    var bb = new Object();
        bb.name = $scope.updateForm.name;
        bb.password = $scope.updateForm.password;
        bb.love = $scope.checkbox;
        User.updateUser($scope.user._id,bb).success(function () {
              $scope.err = undefined;
              ipCookie.remove('LoginUser');
              $scope.user = undefined;
              $scope.cookie = 'invalid';
              $location.path('/');
              $route.reload();
              }).error(function(err){
                $scope.err = err;
                $location.path('/useredits/'+$routeParams.id);
                $route.reload();
              });
      };
}]);
