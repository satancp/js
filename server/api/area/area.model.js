'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AreaSchema = new Schema({
        name: { type: String, required: true },
        users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Area', AreaSchema);