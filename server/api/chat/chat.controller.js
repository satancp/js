'use strict';

var _ = require('lodash');
var Chat = require('./chat.model');
var User = require('../user/user.model');

function params_check(req,type){
  if(type == 'showallchats'){
    if(req.params.id){
      return true;
    }
    else{
      return false;
    }
  }
  if(type == 'create'){
    if(req.body.content && req.body.user && req.body.area){
      if(typeof req.body.content === 'string' && typeof req.body.user === 'string' && typeof req.body.area === 'string'){
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

exports.showallchats = function(req, res) {
  if(params_check(req,'showallchats')){
    Chat.find({area:req.params.id}).populate('user').exec(function (err, chats) {
      if(err) { return handleError(res, err); }
      return res.hal({data:chats});
    });
  }
  else{
    return handleError(res,"Invalid request");
  }
};

// Creates a new chat in the DB.
exports.create = function(req, res) {
  if(params_check(req,'create')){
    Chat.create(req.body, function(err, chat) {
      if(err) { 
                  var y = [];
                  for(var b in err.errors){
                    y.push(err.errors[b].message);
                  }
                  return handleError(res, y); 
      }
      User.findById(req.body.user, function(err, user) {
        user.chat.push(chat._id);
        user.save();
        return res.hal({data: chat});
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