'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/:id', controller.show);
router.post('/login', controller.login);
router.post('/', controller.create);
router.put('/:id', controller.updateuser);

module.exports = router;