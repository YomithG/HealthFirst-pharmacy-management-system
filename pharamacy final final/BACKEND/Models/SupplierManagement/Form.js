const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    Supplier : {
        type: String,
        required: true
    },
    Email : {
        type: String,
        required: true
    }, 
    Medicine : {
        type : String,
        required: true
    }, 
    Quantity : [{
        medicine: String,
        quantity: Number
    }],
    Notes : {
        type : String,
        required: true
    }

})

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;