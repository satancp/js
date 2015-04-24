'use strict';

angular.module('as2App')
   .controller('SigninsCtrl', ['$scope','User','$location','ipCookie', '$route',
       function($scope,User,$location,ipCookie,$route) {
   $scope.handleLoginBtnClick = function () {
      var a = new Object();
        a.email = $scope.loginForm.email;
        a.password = $scope.loginForm.password;
      var query = new Object();
        query.type = 'email';
        query.content = a.email;
        query.auth = '';
        query.api = 'user';
        User.checkUser(query).success(function (message) {
            if(message == "FAILURE"){
              $scope.errm = 0;
              User.loginUser(a)
               .success(function (user) {
                ipCookie('LoginUser',user);
                $location.path('/users/'+user._id);
                $route.reload();
               }).error(function () {
                $scope.errm = 2;
                $location.path('/signins');
                $route.reload();
              });
            }
            else{
              $scope.errm = 1;
              $location.path('/signins');
              $route.reload();
            }
        });
        
    }
}]);
