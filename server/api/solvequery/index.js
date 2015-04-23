'use strict';

var express = require('express');
var controller = require('./solvequery.controller');

var router = express.Router();

router.get('/', controller.solve);

module.exports = router;