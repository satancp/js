'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
	    content: { type: String, required: true },
        updated: { type: Date, default: Date.now },
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	    area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'}
});

ChatSchema.path('content').validate(function (value) {
        if(/bitch|ashole|ass|fuck/i.test(value)){
            return false;
        }
        else{
            return true;
        }
}, 'Please be more polite!');

module.exports = mongoose.model('Chat', ChatSchema);