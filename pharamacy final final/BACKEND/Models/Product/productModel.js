const mongoose = require("mongoose"); 

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        image:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        category:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        countInStock:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("productS", productSchema);