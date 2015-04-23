'use strict';

angular.module('as2App')
.controller('SecondcommentsCtrl', [
      '$scope', 
      'Info', 
      '$routeParams',
      'ipCookie',
      '$location',
      '$route',
      'Area',
       function ($scope,Info,$routeParams,ipCookie,$location,$route,Area) {
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
    Info.getInfo($routeParams.info_id)
        .success(function(info) {
             $scope.info = info;
        });
    
    Info.getComment($routeParams.info_id,$routeParams.comment_id)
        .success(function(comment) {
             $scope.needcomment = comment;
             $scope.allcomments = comment.comments;
        });
    $scope.getuserneedComments = function(num){
      if($scope.user != undefined){
        if(num == 0){
          $scope.allcomments = $scope.needcomment.comments;
        }
        if(num == 5){
          var query1 = new Object();
          query1.api = 'info';
          query1.type = 'secondcomment';
          query1.auth = $scope.user.auth;
          query1.content = $scope.info.title;
          query1.num1 = $routeParams.comment_id;
          query1.num2 = 5;
          Info.getuserneedsecondComments(query1).success(function(comments) {
            $scope.allcomments = comments;
          }).error(function(err){
            alert(err);
            $location.path('infos/'+$routeParams.info_id+'/comments/'+$routeParams.comment_id+'/comments');
            $route.reload();
          });
        }
        if(num == 10){
          var query2 = new Object();
          query2.api = 'info';
          query2.type = 'secondcomment';
          query2.auth = $scope.user.auth;
          query2.content = $scope.info.title;
          query2.num1 = $routeParams.comment_id;
          query2.num2 = 10;
          Info.getuserneedsecondComments(query2).success(function(comments) {
            $scope.allcomments = comments;
          }).error(function(err){
            alert(err);
            $location.path('infos/'+$routeParams.info_id+'/comments/'+$routeParams.comment_id+'/comments');
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
    $scope.incrementUpvotes = function(comment) {
       Info.upvoteSecondComment($scope.info._id, $scope.needcomment._id, comment._id,
                comment.upvotes + 1 )
          .success(function(updated_comment) {
              comment.upvotes = updated_comment.upvotes
          })
    }
    $scope.addComment = function(){
            if($scope.newcomment.content === '') { return; }
            var comment = {
                content: $scope.newcomment.content,
                user: $scope.user._id
            }
            Info.addSecondComment($scope.info._id, $scope.needcomment._id, comment)
                .success(function(added_comment) {
                    $scope.needcomment.comments.push(added_comment)
                    $scope.newcomment = {} ;   
                })
    }
}])