'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LoveSchema = new Schema({
        infotype: {type: mongoose.Schema.Types.ObjectId, ref: 'Infotype'}
});

var UserSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true , unique: true, trim: true},
        password: { type: String, required: true },
        love: [LoveSchema],
        chat: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}],
        area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'},
        power: { type: String, required: true },
        auth: { type: String, required: true }
});

UserSchema.path('password').validate(function (value) {
        if(value && value.length >= 7){
            return true;
        }
        else{
            return false;
        }
}, 'Invalid length!(Should be greater than 7)!');

module.exports = mongoose.model('User', UserSchema);