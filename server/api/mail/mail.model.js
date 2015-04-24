'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MailSchema = new Schema({
	title: {type: String, required: true},
	content: { type: String, required: true},
	sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

MailSchema.path('content').validate(function (value) {
        if(/bitch|ashole|ass|fuck/i.test(value)){
            return false;
        }
        else{
            return true;
        }
}, 'Please be more polite!');

MailSchema.path('title').validate(function (value) {
        if(/bitch|ashole|ass|fuck/i.test(value)){
            return false;
        }
        else{
            return true;
        }
}, 'Please be more polite!');

module.exports = mongoose.model('Mail', MailSchema);