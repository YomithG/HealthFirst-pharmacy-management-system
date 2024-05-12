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
 },
 Email: {
 type: String,
 required: true,
 },
 Username: {
 type: String,
 required: true,
 },
 Password: {
 type: String,
 required: true,
 },
 // Reference to the Account schema
 account: {
 type: Schema.Types.ObjectId,
 ref: 'Account'
 }
});
const CustomerAccount = mongoose.model("CustomerAccount", 
CustomerProfileSchema);
module.exports = CustomerAccount;