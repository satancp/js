'use strict';

var _ = require('lodash');
var User = require('./user.model');
var crypto = require('crypto');

function randomValueBase64 (len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')
        .slice(0, len)
        .replace(/\+/g, '0')
        .replace(/\//g, '0');
}

function params_check(req,type){
  if(type == 'show'){
    if(req.params.id){
      return true;
    }
    else{
      return false;
    }
  }
  if(type == 'login'){
    if(req.body.email && req.body.password){
      if(typeof req.body.email === 'string' && typeof req.body.password === 'string'){
        if(/@/i.test(req.body.email) && req.body.password.length >= 7){
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
  if(type == 'create'){
    if(req.body.name && req.body.password && req.body.email && req.body.area){
      if(typeof req.body.name === 'string' && typeof req.body.password === 'string' && typeof req.body.email === 'string' && typeof req.body.area === 'string'){
        if(/@/i.test(req.body.email) && req.body.password.length >= 7){
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
  if(type == 'updateuser'){
    if(req.params.id){
      if(req.body.name && req.body.password && req.body.love){
        if(typeof req.body.name === 'string' && typeof req.body.password === 'string' && typeof req.body.love === 'object'){
          if(req.body.password.length >= 7){
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
      return false;
    }
  }
}

exports.show = function(req, res) {
  if(params_check(req,'show')){
    User.findById(req.params.id, function (err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
      return res.json(user);
    });
  }
  else{
    return handleError(res, "Invalid request");
  }
};

exports.login = function(req, res) {
  if(params_check(req,'login')){
    User.find({email:req.body.email,password:req.body.password}, function (err, user) {
      if(err) { return handleError(res, err); }
      if(user.length === 0){
        return handleError(res, err);
      }
      else{
        return res.json(201,user[0]);
      }
    });
  }
  else{
    return handleError(res, "Invalid request");
  }
};

exports.create = function(req, res) {
  if(params_check(req,'create')){
    req.body.power = 'user';
    req.body.chat = [];
    req.body.love = [];
    req.body.auth = randomValueBase64(14);
    User.create(req.body, function(err, user) {
      if(err) { 
        return handleError(res, err); 
      }
      return res.json(201, user);
    });
  }
  else{
    return handleError(res, "Invalid request");
  }
};

exports.updateuser = function(req, res) {
  if(params_check(req,'updateuser')){
    User.findById(req.params.id, function (err, user) {
      if (err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
      user.name = req.body.name;
      user.password = req.body.password;
      user.love = req.body.love;
      user.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, user);
      });
    });
  }
  else{
    return handleError(res, "Invalid request");
  }
};

function handleError(res, err) {
  return res.send(500, err);
}