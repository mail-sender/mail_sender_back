const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    account_name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    smtp_server: {
        type: String,
        required: true,
    },
    port: {
        type: String,
        required: true,
    },
    account_date: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('account', accountSchema);

