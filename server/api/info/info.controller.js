'use strict';

var _ = require('lodash');
var Info = require('./info.model');

// Get list of infos
exports.index = function(req, res) {
  Info.find(function (err, infos) {
    if(err) { return handleError(res, err); }
    return res.json(200, infos);
  });
};

// Get a single info
exports.show = function(req, res) {
  Info.findById(req.params.id, function (err, info) {
    if(err) { return handleError(res, err); }
    if(!info) { return res.send(404); }
    return res.json(info);
  });
};

// Creates a new info in the DB.
exports.create = function(req, res) {
  Info.create(req.body, function(err, info) {
    if(err) { return handleError(res, err); }
    return res.json(201, info);
  });
};

// Updates an existing info in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Info.findById(req.params.id, function (err, info) {
    if (err) { return handleError(res, err); }
    if(!info) { return res.send(404); }
    var updated = _.merge(info, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, info);
    });
  });
};

// Deletes a info from the DB.
exports.destroy = function(req, res) {
  Info.findById(req.params.id, function (err, info) {
    if(err) { return handleError(res, err); }
    if(!info) { return res.send(404); }
    info.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}