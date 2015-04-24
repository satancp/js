'use strict';

var express = require('express');
var controller = require('./mail.controller');

var router = express.Router();

router.get('/:id', controller.show);
router.post('/', controller.create);
router.delete('/:user_id/mails/:mail_id', controller.destroy);

module.exports = router;