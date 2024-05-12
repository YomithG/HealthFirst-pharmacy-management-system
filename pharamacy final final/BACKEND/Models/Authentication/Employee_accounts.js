const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeProfileSchema = new Schema({
 FullName: {
 type: String,
 required: true,
 },
 NIC: {
 
 type: String,
 required: true,
 // Add NIC-specific validation if needed
 },
 EmployeeID: {
 type: String,
 required: true,
 },
 PhoneNo: {
 type: String,
 required: true,
 },
 Email: {
 type: String,
 required: true,
 },
 Address: {
 type: String,
 required: true,
 },
 EPFNo: {
 type: String,
 required: true,
 // Add EPFNo-specific validation if needed
 },
 Designation: {
 type: String,
 required: true,
 },
});
const Employee = mongoose.model("Employee", EmployeeProfileSchema);
module.exports = Employee;