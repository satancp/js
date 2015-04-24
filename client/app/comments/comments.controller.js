'use strict';

angular.module('as2App')
.controller('CommentsCtrl', [
      '$scope', 
      'Info', 
      'Area',
      '$routeParams',
      'ipCookie',
      '$location',
      '$route',
      'User',
       function ($scope,Info,Area,$routeParams,ipCookie,$location,$route,User) {
    Info.getInfo($routeParams.info_id)
        .success(function(info) {
             $scope.info = info;
             $scope.allcomments = info.comments;
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
    $scope.incrementUpvotes = function(comment) {
       Info.upvoteFirstComment($scope.info._id, comment._id , 
                comment.upvotes + 1 )
          .success(function(updated_comment) {
              comment.upvotes = updated_comment.upvotes
          })
    }
    $scope.getuserneedComments = function(num){
      if($scope.user != undefined){
        if(num == 0){
          $scope.allcomments = $scope.info.comments;
        }
        if(num == 5){
          var query1 = new Object();
          query1.api = 'info';
          query1.type = 'comment';
          query1.auth = $scope.user.auth;
          query1.content = $scope.info.title;
          query1.num = 5;
          Info.getuserneedComments(query1).success(function(comments) {
            $scope.allcomments = comments;
          }).error(function(err){
            alert(err);
            $location.path('infos/'+$routeParams.info_id+'/comments');
            $route.reload();
          });
        }
        if(num == 10){
          var query2 = new Object();
          query2.api = 'info';
          query2.type = 'comment';
          query2.auth = $scope.user.auth;
          query2.content = $scope.info.title;
          query2.num = 10;
          Info.getuserneedComments(query2).success(function(comments) {
            $scope.allcomments = comments;
          }).error(function(err){
            alert(err);
            $location.path('infos/'+$routeParams.info_id+'/comments');
            $route.reload();
          });
        }
      }
      else{
        alert('Please login!');
        $location.path('/signins');
        $route.reload();
      }
    }
    $scope.addComment = function(){
            if($scope.comment.content === '') { return; }
            var comment = {
                content: $scope.comment.content,
                user: $scope.user._id
            }
            Info.addFirstComment($scope.info._id, comment )
                .success(function(added_comment) {
                    $scope.err = undefined;
                    $scope.info.comments.push(added_comment)
                    $scope.comment = {} ;   
                }).error(function(err){
                  $scope.err = err;
                  $location.path(/infos/+$routeParams.info_id+'/comments');
                  $route.reload();
                });
    }
}])