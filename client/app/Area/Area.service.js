'use strict';

angular.module('as2App')
      .factory('Area', ['$http', function($http){
   var api = {
     getAreas : function() {
          return $http.get('/api/areas')
     },
     getChats : function(id) {
          return $http.get('/api/chats/'+id)
     },
     getUsers : function(id) {
          return $http.get('/api/areas/'+id)
     },
     deleteUser : function(id,user) {
          return $http.get('/api/areas/'+id+'/'+user)
     },
     addUser : function(id,user) {
          return $http.post('/api/areas/'+id+'/'+user)
     },
     addChat : function(chat) {
          return $http.post('/api/chats/',chat)
     }
  }
  return api
}])
