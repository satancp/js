'use strict';

angular.module('as2App')
  .controller('InfotypesCtrl', ['$scope','Infotype','Info','$filter','ngTableParams','$routeParams','ipCookie', '$location','$route','Area',
       function($scope,Infotype,Info,$filter,ngTableParams,$routeParams,ipCookie,$location,$route,Area) {
    Infotype.getInfotype($routeParams.infotype_id).success(function(infotype) {
    	     $scope.infotype = infotype;
       	});
    Infotype.rateIncrease($routeParams.infotype_id).success(function(infotype) {
           $scope.infotype = infotype;
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
    Infotype.getInfos($routeParams.infotype_id)
        .success(function(infos) {
             $scope.infos = infos;
             var data = $scope.infos;
             $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            title: 'asc'     // initial sorting
        }
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
        });
}]) 
