'use strict';

var _ = require('lodash');
var Solvequery = require('./solvequery.model');
var Area = require('../area/area.model');
var Chat = require('../chat/chat.model');
var Info = require('../info/info.model');
var Infotype = require('../infotype/infotype.model');
var User = require('../user/user.model');

function query_check(p){
  if(p.auth){
    if(p.api){
      if(p.type){
        if(p.content){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }
  else{
    if(p.api == 'user' && p.type == 'email'){
      if(p.content){
        if(/@/i.test(p.content)){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }
}

exports.solve = function(req, res) {
  if(query_check){
    if(req.query.api == 'user'){
      if(req.query.type == 'email'){
        User.find({email:req.query.content}, function (err, user) {
          if(user.length === 0){
            return res.json(201,"OK");
          }
          else{
            return res.json(201,"FAILURE");
          }
        });
      }
    }
    if(req.query.api == 'info'){
      if(req.query.type == 'comment'){
        Info.find({title:req.query.content}).populate('comments.user').exec(function (err, info) {
          var l = info[0].comments.length;
          info[0].comments.sort(function(a, b){
            if(b.upvotes > a.upvotes) {
              return 1;
            }
            if(a.upvotes < b.upvotes) {
              return -1;
            }
            return 0;
          });
          if(req.query.num < l){
            var n = req.query.num;
            var x = l - n;
            info[0].comments.splice(n,x);
            return res.json(201,info[0].comments);
          }
          else{
            return res.json(201,info[0].comments);
          }
        });
      }
      if(req.query.type == 'secondcomment'){
        Info.find({title:req.query.content}).populate('comments.comments.user').exec(function (err, info) {
          var comment_index = _.findIndex(info[0].comments, 
            function(comment) {
              return comment._id == req.query.num1;
            }); 
          var l = info[0].comments[comment_index].comments.length;
          info[0].comments[comment_index].comments.sort(function(a, b){
            if(b.upvotes > a.upvotes) {
              return 1;
            }
            if(a.upvotes < b.upvotes) {
              return -1;
            }
            return 0;
          });
          if(req.query.num2 < l){
            var n = req.query.num2;
            var x = l - n;
            info[0].comments[comment_index].comments.splice(n,x);
            return res.json(201,info[0].comments[comment_index].comments);
          }
          else{
            return res.json(201,info[0].comments[comment_index].comments);
          }
        });
      }
    }
    if(req.query.api == 'infotype'){
      if(req.query.type == 'view'){
        if(req.query.content == 0){
          Infotype.find().populate('infos').exec(function (err, infotypes) {
          if(err) { return handleError(res, err); }
          return res.json(200, infotypes);
          });
        }
        if(req.query.content == 1){
          delete req.query.api;
          delete req.query.type;
          delete req.query.auth;
          delete req.query.content;
          var needdata = [];
          var l = Object.keys(req.query).length;
          for(var key in req.query){
            Infotype.find({_id:req.query[key]}).populate('infos').exec(function (err, infotype) {
            if(err) { return handleError(res, err); }
            needdata.push(infotype[0]);
            if(needdata.length == l){
              return res.json(200, needdata);
            }
            });
          }
        }
      }
    }
  }
  else{
    return handleError(res,"Invalid query");
  }
};

function handleError(res, err) {
  return res.send(500, err);
}