const mongoose = require('mongoose');

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
    BatchID: {
        type: String,
        required: true
    },
    BatchName: {
        type: String,
        required: true
    },
    ItemID: {
        type: String,
        required: true
    },
    ItemName: {
        type: String,
        required: true
    },
    ItemCategory: {
        type: String,
        required: true
    },
    ItemSize: {
        type: String,
        required: true
    },
    
    SupplierID: {
        type: String,
        required: true
    },
    SupplierName: {
        type: String,
        required: true
    }
});

const Medicine = mongoose.model("Medicine", MedicineSchema);

module.exports = Medicine;
