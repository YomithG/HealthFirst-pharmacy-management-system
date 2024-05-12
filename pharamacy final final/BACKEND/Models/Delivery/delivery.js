//creating model
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    name : {
        type: String,
        required:true
    },

    contactNumber :{
        type: Number ,
        required: true
    },

    

    address:{
        type:String,
        required: true
    },
    city: {
        type: String,
        required: true
    },

    amount:{
        type: Number ,
        required: true
    },
    fee:{
        type: Number ,
        required: true
    },
    total: {
        type: Number,
        required: true
    },

    rider :{
        type:String,
        required: true
    },
    status: {
        type: String,
        required:true
    }

})

const Delivery = mongoose.model("Delivery",deliverySchema);
 /*Delivery kiyanne database eken thiyena table eka nama wage, habai database eke akuru simple and plural wela thiyenne*/

 module.exports = Delivery;
