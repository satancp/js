'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSecondStageSchema = new Schema({
	    content: { type: String, required: true },
	    user: { type: String, required: true },
	    upvotes: Number
});

var CommentFirstStageSchema = new Schema({
        content: { type: String, required: true },
        user: { type: String, required: true },
        comments: [CommentSecondStageSchema],
        upvotes: Number
});

var InfoSchema = new Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        comments: [CommentFirstStageSchema],
        upvotes: Number
});

module.exports = mongoose.model('Info', InfoSchema);