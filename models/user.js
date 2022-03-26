const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const accountSchema = require("./account");
const bodyFormatSchema = require('./bodyFormat');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    accounts: [accountSchema],
    body_formats: [bodyFormatSchema],
    contacts_id: { 
        type: ObjectId, 
        ref: 'contact'
    },
    join_date: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('user', userSchema);

