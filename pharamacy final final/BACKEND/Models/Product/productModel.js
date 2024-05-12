const mongoose = require("mongoose");

// Custom validator function for price
const validatePrice = function (value) {
    // Check if price is a positive number
    return value > 0;
};

// Custom validator function for countInStock
const validateCountInStock = function (value) {
    // Check if countInStock is a non-negative integer
    return Number.isInteger(value) && value >= 0;
};

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: validatePrice,
                message: "Price must be a positive number",
            },
        },
        countInStock: {
            type: Number,
            required: true,
            validate: {
                validator: validateCountInStock,
                message: "Count in stock must be a non-negative integer",
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("productS", productSchema);
