const mongoose = require('mongoose')

const Schema = mongoose.Schema

const salaryShema = new Schema({
    name: {
        type: String,
        required: true
    },
    basic: {
        type: Number,
        required: true
    },
    leaves: {
        type: Number,
        required: true
    },
    oThours: {
        type: Number,
        required: true
    },
    net: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Salary', salaryShema)