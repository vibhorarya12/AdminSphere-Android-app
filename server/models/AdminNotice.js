//schema for admin notices//
const mongoose = require('mongoose');
const { Schema } = mongoose;
const AdminNoticeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('adminnotice', AdminNoticeSchema);
