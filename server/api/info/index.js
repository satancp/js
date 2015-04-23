'use strict';

var express = require('express');
var controller = require('./info.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:info_id/comments/:comment_id', controller.showcomment);
router.post('/', controller.create);
router.post('/:id/upvotes', controller.update_upvotes);
router.post('/:id/comments', controller.add_first_comment);
router.post('/:info_id/comments/:comment_id/comments', controller.add_second_comment);
router.post('/:info_id/comments/:comment_id/upvotes', controller.update_first_comment_upvotes);
router.post('/:info_id/comments/:comment_id/comments/:comment2_id/upvotes', controller.update_second_comment_upvotes);

module.exports = router;