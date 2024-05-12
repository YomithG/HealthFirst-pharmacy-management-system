const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    outTime: { 
        type: String,
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
