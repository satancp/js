'use strict';

var express = require('express');
var controller = require('./area.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.showalluser);
router.get('/:id/:user', controller.deleteuser);
router.post('/:id/:user', controller.adduser);

module.exports = router;