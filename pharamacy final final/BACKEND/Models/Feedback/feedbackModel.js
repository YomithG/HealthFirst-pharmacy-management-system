const mongoose = require('mongoose')

// Instance of schema
const Schema = mongoose.Schema

// Define enum values for ratings
const ratingValues = [1, 2, 3, 4, 5]

//scema defines the strucrure of a document
const feedbackSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    enum: ratingValues // Specify enum values for rating
  },
}, { timestamps: true })

//timestamps provide the date and time the proprty created

// model apply the schema to a particular model

module.exports = mongoose.model('feedback', feedbackSchema)


