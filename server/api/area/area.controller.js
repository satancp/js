'use strict';

var _ = require('lodash');
var Area = require('./area.model');
var User = require('../user/user.model');

function params_check(req,type){
  if(type == 'index'){
    return true;
  }
  if(type == 'showalluser'){
    if(req.params.id){
      return true;
    }
    else{
      return false;
    }
  }
  if(type == 'adduser'){
    if(req.params.id && req.params.user){
      return true;
    }
    else{
      return false;
    }
  }
  if(type == 'deleteuser'){
    if(req.params.id && req.params.user){
      return true;
    }
    else{
      return false;
    }
  }
}

exports.index = function(req, res) {
  if(params_check(req,'index')){
    Area.find(function (err, areas) {
      if(err) { return handleError(res, err); }
      return res.json(200, areas);
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.showalluser = function(req, res) {
  if(params_check(req,'showalluser')){
    Area.findById(req.params.id).populate('users').exec(function (err, needusers) {
      if(err) { return handleError(res, err); }
      return res.json(needusers.users);
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.adduser = function(req, res) {
  if(params_check(req,'adduser')){
    Area.findById(req.params.id, function (err, area) {
      User.findById(req.params.user, function (err, user) {
      var key = req.params.user;
      var index = area.users.indexOf(key);
      if(~index){area.users.splice(index,1);}
      area.users.push(key);
      area.save();
      user.area = req.params.id;
      user.save();
      if(err) { return handleError(res, err); }
      if(!area) { return res.send(404); }
      return res.json(area);
      });
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

exports.deleteuser = function(req, res) {
  if(params_check(req,'deleteuser')){
    Area.findById(req.params.id, function (err, area) {
      User.findById(req.params.user, function (err, user) {
      var key = req.params.user;
      var index = area.users.indexOf(key);
      if(~index){
        area.users.splice(index,1);
        user.area = undefined;
      }
      area.save();
      user.save();
      if(err) { return handleError(res, err); }
      if(!area) { return res.send(404); }
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