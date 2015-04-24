'use strict';

var _ = require('lodash');
var Mail = require('./mail.model');
var User = require('../user/user.model');

function params_check(req,type){
  if(type == 'show'){
    if(req.params.id){
      return true;
    }
    else{
      return false;
    }
  }
  if(type == 'create'){
    if(req.body.title && req.body.content && req.body.sender && req.body.receiver){
      if(typeof req.body.title === 'string' && typeof req.body.content === 'string' && typeof req.body.sender === 'string' && typeof req.body.receiver){
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
  if(type == 'destroy'){
    if(req.params.mail_id && req.params.user_id){
      return true;
    }
    else{
      return false;
    }
  }
}

exports.show = function(req, res) {
  if(params_check(req,'show')){
    Mail.find({receiver:req.params.id}, function (err, mail) {
      if(err) { return handleError(res, err); }
      if(!mail) { return res.send(404); }
      return res.json(mail);
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.create = function(req, res) {
  if(params_check(req,'create')){
    Mail.create(req.body, function(err, mail) {
      if(err) { return handleError(res, err); }
      return res.json(201, mail);
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.destroy = function(req, res) {
  if(params_check(req,'destroy')){
    Mail.findById(req.params.mail_id, function (err, mail) {
      if(err) { return handleError(res, err); }
      if(!mail) { return res.send(404); }
      mail.remove(function(err) {
        if(err) { return handleError(res, err); }
        User.findById(req.params.user_id, function (err, user) {
          for(var key in user.receivemails){
            if(user.receivemails[key] == req.params.mail_id){
              var realkey = parseInt(key,10);
              user.receivemails.splice(realkey,1);
              return res.send(200);
            }
          }
        })
      });
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

function handleError(res, err) {
  return res.send(500, err);
}