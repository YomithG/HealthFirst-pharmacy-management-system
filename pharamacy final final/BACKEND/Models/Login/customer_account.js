const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerProfileSchema = new Schema({
  FullName: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  PhoneNo: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
    // Add NIC-specific validation if needed
  },
  Email: {
    type: String,
    required: true,
  }
});


const Account = mongoose.model("Account", CustomerProfileSchema);

module.exports = Account;
