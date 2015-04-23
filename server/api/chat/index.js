'use strict';

var express = require('express');
var controller = require('./chat.controller');

var router = express.Router();

router.get('/:id', controller.showallchats);
router.post('/', controller.create);

module.exports = router;