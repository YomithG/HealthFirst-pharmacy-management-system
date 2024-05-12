const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v); // Validate telephone number format (e.g., 123-456-7890)
            },
            message: props => `${props.value} is not a valid phone number! Please use the format XXX-XXX-XXXX.`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v); // Validate email format
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    comp_content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
