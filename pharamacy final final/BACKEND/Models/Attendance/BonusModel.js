const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bonusSchema = new Schema({
    bonusID: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: { 
        type: Number,
        required: true 
    },
    bonusAmount: { 
        type: Number,
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Bonus', bonusSchema);
