const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const groupSchema = require('./group');

const contactSchema = mongoose.Schema({
    _id: { type: ObjectId },
    group: [groupSchema]
});

module.exports = mongoose.model('contact', contactSchema);
