const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const accountSchema = mongoose.Schema({
    _id: { type: ObjectId },
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
    }
});
