'use strict';

var _ = require('lodash')

var Infotype = require('./infotype.model');   

function params_check(req,type){
  if(type == 'index'){
    return true;
  }
  if(type == 'showinfotype'){
    if(req.params.id){
      return true;
    }
    else{
      return false;
    }
  }
  if(type == 'rateincrease'){
    if(req.params.id){
      return true;
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
  if(type == 'create'){
    if(req.body.name && req.body.infos && req.body.rate){
      if(typeof req.body.name === 'string' && typeof req.body.infos === 'object' && typeof req.body.rate === 'number'){
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
}

function handleError(res, err) {
    return res.send(500, err);
}

exports.index = function(req, res) {
  if(params_check(req,'index')){
    Infotype.find().populate('infos').exec(function (err, infotypes) {
      if(err) { return handleError(res, err); }
        return res.json(200, infotypes);
    });
  }
  else{
    return handleError(res, "Invalid request");
  }
};

exports.showinfotype = function(req, res) {
  if(params_check(req, 'showinfotype')){
    Infotype.findById(req.params.id,function (err, infotype) {
      if(err) { return handleError(res, err); }
        return res.json(200, infotype);
    });
  }
  else{
    return handleError(res, "Invalid request");
  }
};

exports.rateincrease = function(req, res) {
  if(params_check(req, 'rateincrease')){
    Infotype.findById(req.params.id,function (err, infotype) {
        infotype.rate += 1;
        infotype.save();
        if(err) { return handleError(res, err); }
        return res.json(200, infotype);
    });
  }
  else{
    return handleError(res, "Invalid request");
  }
};

exports.show = function(req, res) {
  if(params_check(req, 'show')){
        Infotype.findById(req.params.id).populate('infos').exec(function (err, needinfos) {
           if(err) { return handleError(res, err); }
           return res.json(200, needinfos.infos)
        })
  }
  else{
    return handleError(res, "Invalid request");
  }
};

exports.create = function(req, res) {
  if(params_check(req, 'create')){
    Infotype.create(req.body, function(err, infotype) {
      if(err) { return handleError(res, err); }
        return res.json(201, infotype);
    });
  }
  else{
    return handleError(res, "Invalid request");
  }
};