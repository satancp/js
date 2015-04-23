'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSecondStageSchema = new Schema({
	    content: { type: String, required: true},
	    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	    upvotes: Number
});

CommentSecondStageSchema.path('content').validate(function (value) {
        if(value.length >= 10 && value.length <= 60){
            return true;
        }
        else{
            return false;
        }
}, 'Invalid length!(Should be between 10-60)!');

CommentSecondStageSchema.path('content').validate(function (value) {
        if(/bitch|ashole|ass|fuck/i.test(value)){
            return false;
        }
        else{
            return true;
        }
}, 'Please be more polite!');

var CommentFirstStageSchema = new Schema({
        content: { type: String, required: true, min: 10, max: 60},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comments: [CommentSecondStageSchema],
        upvotes: Number
});

CommentFirstStageSchema.path('content').validate(function (value) {
        if(value.length >= 10 && value.length <= 60){
            return true;
        }
        else{
            return false;
        }
}, 'Invalid length!(Should be between 10-60)!');

CommentFirstStageSchema.path('content').validate(function (value) {
        if(/bitch|ashole|ass|fuck/i.test(value)){
            return false;
        }
        else{
            return true;
        }
}, 'Please be more polite!');

var InfoSchema = new Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        comments: [CommentFirstStageSchema],
        infotype: {type: mongoose.Schema.Types.ObjectId, ref: 'Infotype'},
        upvotes: Number
});

module.exports = mongoose.model('Info', InfoSchema);

