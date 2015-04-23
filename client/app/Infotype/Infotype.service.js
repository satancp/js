'use strict';

angular.module('as2App')
      .factory('Infotype', ['$http', function($http){
   var api = {
     getInfotypes : function() {
          return $http.get('/api/infotypes')
     },
     getuserneedView : function(query) {
          var i = 1;
          var str = '';
          var strx = '&view';
          while(query['view'+i]){
            var x = strx + i + '=';
            str = str + x + query['view'+i];
            i++;
          }
          return $http.get('/api/solvequerys?api='+query.api+'&type='+query.type+'&content='+query.content+'&auth='+query.auth+str)
     },
     getInfotype : function(id) {
          return $http.get('/api/infotypes/'+ id + '/infotypes')
     },
     rateIncrease : function(id) {
          return $http.get('/api/infotypes/rate/'+ id)
     },
     getInfos : function(id) {
          return $http.get('/api/infotypes/'+ id)
     },
     addInfotype : function(infotype) {
          return $http.post('/api/infotypes',infotype)
     }
  }
  return api
}])