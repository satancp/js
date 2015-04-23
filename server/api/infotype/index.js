'use strict';

var express = require('express');
var controller = require('./infotype.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/infotypes', controller.showinfotype);
router.post('/', controller.create);
router.get('/rate/:id', controller.rateincrease);

module.exports = router;