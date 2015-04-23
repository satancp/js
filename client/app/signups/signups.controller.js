'use strict';

angular.module('as2App')
  .controller('SignupsCtrl', ['$scope','User','$location','ipCookie','Area','$route', 
       function($scope,User,$location,ipCookie,Area,$route) {
    Area.getAreas()
        .success(function(areas) {
             $scope.areas = areas;
             $scope.handleRegBtnClick = function () {
    var aa = new Object();
        aa.name = $scope.registrationForm.name;
        aa.email = $scope.registrationForm.email;
        aa.password = $scope.registrationForm.password;
        aa.area = areas[0]._id;
        User.addUser(aa).success(function (added_user) {
              $scope.err = undefined;
              ipCookie('LoginUser',added_user)
              $location.path('/users/'+ added_user._id);
              $route.reload();
              }).error(function(err){
                $scope.err = err;
              });
      };
        });
  }]);

