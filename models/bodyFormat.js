const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bodyFormatSchema = mongoose.Schema({
    _id: { type: ObjectId },
    format_name: {
        type: String,
        required: true,
    },
    main_txt: {
        type: String,
        required: true,
    }
});
