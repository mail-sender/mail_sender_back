const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const receiverSchema = require('./receiver');

const contactSchema = mongoose.Schema({
    _id: { type: ObjectId },
    name: {
        type: String,
        required: true,
    },
    receivers: [receiverSchema]
});
