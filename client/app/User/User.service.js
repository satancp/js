'use strict';

angular.module('as2App')
      .factory('User', ['$http', function($http){
   var api = {
     getUsers : function() {
          return $http.get('/api/users')
     },
     getUser : function(id) {
          return $http.get('/api/users/'+id)
     },
     addUser : function(user) {
          return $http.post('/api/users',user)
     },
     updateUser : function(id,user) {
          return $http.put('/api/users/'+id,user)
     },
     checkUser : function(query) {
          return $http.get('/api/solvequerys?api='+query.api+'&type='+query.type+'&content='+query.content+'&auth='+query.auth)
     },
     loginUser : function(user) {
          return $http.post('/api/users/login/',user)
     }
  }
  return api
}])