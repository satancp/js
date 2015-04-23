'use strict';

angular.module('as2App')
      .factory('Info', ['$http', function($http){
   var api = {
     getInfos : function() {
          return $http.get('/api/infos')
     },
     getInfotypes : function() {
          return $http.get('/api/infotypes')
     },
     addInfo : function(info) {
          return $http.post('/api/infos',info)
     },
     addFirstComment : function(info_id, comment) {
          return $http.post('/api/infos/' + info_id + '/comments',
                            comment)
     },
     addSecondComment : function(info_id, comment_id, comment) {
          return $http.post('/api/infos/' + info_id + '/comments/' + comment_id + '/comments',
                            comment)
     },
     upvoteInfo : function(info_id, new_upvote_count ) {
          return $http.post('/api/infos/' + info_id + '/upvotes', 
                     {upvotes: new_upvote_count })
     },
     upvoteFirstComment : function(info_id, comment_id, new_upvote_count ) {
          return $http.post( '/api/infos/' +
                      info_id + '/comments/' +  comment_id + '/upvotes', 
                     {upvotes: new_upvote_count })
     },
     upvoteSecondComment : function(info_id, comment_id, comment2_id, new_upvote_count ) {
          return $http.post( '/api/infos/' +
                      info_id + '/comments/' +  comment_id + '/comments/' + comment2_id + '/upvotes', 
                     {upvotes: new_upvote_count })
     },
     getInfo : function(info_id) {
        return $http.get('/api/infos/' + info_id )
     },
     getComment : function(info_id, comment_id) {
        return $http.get('/api/infos/' + info_id + '/comments/' + comment_id)
     },
     getuserneedComments : function(query) {
        return $http.get('/api/solvequerys?api='+query.api+'&type='+query.type+'&content='+query.content+'&auth='+query.auth+'&num='+query.num)
     },
     getuserneedsecondComments : function(query) {
        return $http.get('/api/solvequerys?api='+query.api+'&type='+query.type+'&content='+query.content+'&auth='+query.auth+'&num1='+query.num1+'&num2='+query.num2)
     }
  }
  return api
}])
