const mongoose = require("mongoose"); 

// Declare the Schema of the Mongo model
var detailsSchema = new mongoose.Schema(
  {
    // Currently logged in user id
    // customer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    name: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
        validate: {
          validator: function (value) {
            // Check if the value contains exactly 10 digits
            return /^[0-9]{9}$/.test(value);
          },
        },
    },  
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "productS", required: true,},
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      default: 'Pending'
    },
  },
  
  {
    timestamps: true,
  },
  
);

//Export the model
module.exports = mongoose.model("delivery_details", detailsSchema);