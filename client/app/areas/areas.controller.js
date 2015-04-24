angular.module('as2App')
  .controller('AreasCtrl', ['$scope','Area','Info','ipCookie','$location','$route','$routeParams','$interval',
       function($scope,Area,Info,ipCookie,$location,$route,$routeParams,$interval) {
    Area.getUsers($routeParams.id)
        .success(function(users) {
             $scope.users = users;
        });
    Area.getChats($routeParams.id)
        .success(function(chats) {
             $scope.chats = chats;
             var everytime;
             everytime = $interval(function() {
             Area.getChats($routeParams.id)
             .success(function(chats) {
             $scope.chats = chats;
             });}, 5000);
             var everytime2;
             everytime2 = $interval(function() {
             Area.getUsers($routeParams.id)
             .success(function(users) {
             $scope.users = users;
             });}, 60000);
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
              Area.addUser($routeParams.id,$scope.user._id);
              $scope.users.push($scope.user);
              ipCookie('Chat',$routeParams.id);
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
        });
    $scope.addChat = function () {
              var chat = {
                content: $scope.newchat.content,
                user: $scope.user._id,
                area: $routeParams.id
            };
            Area.addChat(chat).success(function(added_chat) {
                  $scope.err = undefined;
            	    added_chat.user = $scope.user;
                    $scope.chats.push(added_chat);
                    $scope.newchat = {};   
                }).error(function(err){
                  $scope.err = err;
                  $location.path('/areas/'+$routeParams.id);
                  $route.reload();
                });
              };

}]) 