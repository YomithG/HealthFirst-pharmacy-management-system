//D:\Pasindi\SLIIT\Y2S2\ITP\express\backend\models\orderModel.js
const mongoose = require("mongoose"); 

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
    // Currently logged in user id
    // customer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
        item_id: {
            type: String,
        },
        amount: {
            type: Number,
        },
        total: {
            type: Number
        }
    }
);

//Export the model
module.exports = mongoose.model("order_details", orderSchema);
