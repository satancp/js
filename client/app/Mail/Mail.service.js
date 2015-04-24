'use strict';

angular.module('as2App')
      .factory('Mail', ['$http', function($http){
   var api = {
     getMails : function(id) {
          return $http.get('/api/mails/'+id)
     },
     sendMail : function(mail) {
          return $http.post('/api/mails/',mail)
     },
     deleteMail : function(user_id,mail_id) {
          return $http.delete('/api/mails/'+user_id+'/mails/'+mail_id)
     }
  }
  return api
}])