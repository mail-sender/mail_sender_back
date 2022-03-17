const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const receiverSchema = mongoose.Schema({
    _id: { type: ObjectId },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    details: {
        type: list
    }
});
