const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const receiverSchema = require('receiver');

const contactSchema = mongoose.Schema({
    group_name: {
        type: String,
        required: true,
    },
    receivers: [receiverSchema]
});

module.exports = mongoose.model('contact', contactSchema);
