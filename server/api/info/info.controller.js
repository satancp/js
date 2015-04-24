'use strict';

var _ = require('lodash')

var Info = require('./info.model');  
var Infotype = require('../infotype/infotype.model');  
var User = require('../user/user.model');
var Mail = require('../mail/mail.model');

function handleError(res, err) {
    return res.send(500, err);
}

function params_check(req,type){
  if(type == 'index'){
    return true;
  }
  if(type == 'create'){
    if(req.body.title && req.body.content && req.body.infotype){
      if(typeof req.body.title === 'string' && typeof req.body.content === 'string' && typeof req.body.infotype === 'string'){
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
  if(type == 'show'){
    if(req.params.id){
      return true;
    }
    else{
      return false;
    }
  }
  if(type == 'showcomment'){
    if(req.params.info_id && req.params.comment_id){
      return true;
    }
    else{
      return false;
    }
  }
  if(type == 'update_upvotes'){
    if(req.params.id){
      if(req.body.upvotes){
        if(typeof req.body.upvotes === 'number'){
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
  if(type == 'add_first_comment'){
    if(req.params.id){
      if(req.body.content && req.body.user){
        if(typeof req.body.content === 'string' && typeof req.body.user === 'string'){
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
  if(type == 'add_second_comment'){
    if(req.params.info_id && req.params.comment_id){
      if(req.body.content && req.body.user){
        if(typeof req.body.content === 'string' && typeof req.body.user === 'string'){
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
  if(type == 'update_first_comment_upvotes'){
    if(req.params.info_id && req.params.comment_id){
      if(req.body.upvotes){
        if(typeof req.body.upvotes === 'number'){
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
  if(type == 'update_second_comment_upvotes'){
    if(req.params.info_id && req.params.comment_id && req.params.comment2_id){
      if(req.body.upvotes){
        if(typeof req.body.upvotes === 'number'){
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
exports.index = function(req, res) {
  if(params_check(req,'index')){
    Info.find(function (err, infos) {
      if(err) { return handleError(res, err); }
        return res.json(200, infos);
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.create = function(req, res) {
  if(params_check(req,'create')){
    req.body.comments = []
    req.body.upvotes = 0 
      Info.create(req.body, function(err, info) {
        Infotype.findById(req.body.infotype, function(err, infotype) {
          infotype.infos.push(info._id)
          infotype.save()
        if(err) { return handleError(res, err); }
          return res.json(201, info);
        });
      });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.show = function(req, res) {
  if(params_check(req,'show')){
    Info.findById(req.params.id).populate('comments.user').exec(function (err, info) {
           if(err) { return handleError(res, err); }
           return res.json(200, info)
        })
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.showcomment = function(req, res) {
  if(params_check(req,'showcomment')){
    Info.findById(req.params.info_id).populate('comments.comments.user').exec(function (err, info) {
      var comment_index = _.findIndex(info.comments, 
            function(comment) {
              return comment._id == req.params.comment_id;
            }); 
      if(err) { return handleError(res, err); }
        return res.json(200, info.comments[comment_index]);
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};


exports.update_upvotes = function(req, res) {
  if(params_check(req,'update_upvotes')){
    Info.findById(req.params.id, function (err, info) {
            info.upvotes = req.body.upvotes
            info.save(function (err) {
                if(err) { return handleError(res, err); }
                return res.json(200, info);
            });
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.add_first_comment = function(req, res) {
  if(params_check(req,'add_first_comment')){
    Info.findById(req.params.id, function (err, info) {
              var comment = {
                  content: req.body.content,
                  user: req.body.user,
                  comments: [],
                  upvotes: 0
               }
              info.comments.push(comment)
              info.save(function (err) {
                if(err) { 
                  var x = [];
                  for(var a in err.errors){
                    x.push(err.errors[a].message);
                  }
                  return handleError(res, x); 
                }
                var last = _.last(info.comments)
                if (last != undefined) {
                   return res.json(200, last);
                } 
                else {
                  return res.send(500,"Database error")
                }
              });
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.add_second_comment = function(req, res) {
  if(params_check(req,'add_second_comment')){
    Info.findById(req.params.info_id, function (err, info) {
              var comment_index = _.findIndex(info.comments,
                  function(comment){
                    return comment._id == req.params.comment_id;
                  });
              var acomment = {
                  content: req.body.content,
                  user: req.body.user,
                  upvotes: 0
              }
              info.comments[comment_index].comments.push(acomment)
              info.save(function (err) {
                if(err) { 
                  var x = [];
                  for(var a in err.errors){
                    x.push(err.errors[a].message);
                  }
                  return handleError(res, x); 
                }
                User.findById(info.comments[comment_index].user, function (err, user) {
                  User.findById(req.body.user, function (err, another_user) {
                  User.find(function (err, users) {
                  var newmail = {
                    title: 'Your comment has been commented.',
                    content: 'Your comment in '+info.title+' has been commented by '+another_user.name+'.',
                    sender: users[0]._id,
                    receiver: user._id
                  }
                  Mail.create(newmail, function(err, mail) {
                    if(err) { 
                    var y = [];
                    for(var a in err.errors){
                    y.push(err.errors[a].message);
                    }
                    return handleError(res, y); 
                    }
                    user.receivemails.push(mail._id);
                    user.save();
                var last = _.last(info.comments[comment_index].comments)
                if (last != undefined) {
                   return res.json(200, last);
                } 
                else {
                  return res.send(500,"Database error")
                }
              })})})})
              });
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.update_first_comment_upvotes = function(req, res) {
  if(params_check(req,'update_first_comment_upvotes')){
    Info.findById(req.params.info_id, function (err, info) {
        var comment_index = _.findIndex(info.comments, 
            function(comment) {
              return comment._id == req.params.comment_id;
            }); 
        if (comment_index != -1) {
            info.comments[comment_index].upvotes = req.body.upvotes
            info.save(function (err) {
              if(err) { return handleError(res, err); }
                return res.json(200,info.comments[comment_index])
            });
        } 
        else {
            return res.send(401,"Bad comment id")
        }
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.update_second_comment_upvotes = function(req, res) {
  if(params_check(req,'update_second_comment_upvotes')){
    Info.findById(req.params.info_id, function (err, info) {
        var comment_index = _.findIndex(info.comments, 
            function(comment) {
              return comment._id == req.params.comment_id;
            }); 
        var comment2_index = _.findIndex(info.comments[comment_index].comments, 
            function(comment) {
              return comment._id == req.params.comment2_id;
            }); 
        if (comment2_index != -1) {
            info.comments[comment_index].comments[comment2_index].upvotes = req.body.upvotes
            info.save(function (err) {
              if(err) { return handleError(res, err); }
                return res.json(200,info.comments[comment_index].comments[comment2_index])
            });
        } 
        else {
            return res.send(401,"Bad comment id")
        }
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};