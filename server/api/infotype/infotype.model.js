'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InfotypeSchema = new Schema({
        name: { type: String, required: true },
        infos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Info'}],
        rate: Number
});

module.exports = mongoose.model('Infotype', InfotypeSchema);