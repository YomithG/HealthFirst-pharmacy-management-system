const router = require("express").Router();
const customer_account = require("../../Models/Authentication/customer_account.js");
// Add a new customer account
router.post("/add", async (req, res) => {
 try {

    console.log("Body", req.body)
 const {
 FullName,
 Gender,
 NIC,
 Address,
 City,
 District,
 DOB,
 PhoneNo,
 Email,
 username, // Add Username field
 password, // Add Password field
 } = req.body;
 // Create a new customer instance
 const newCustomer = new customer_account({
 FullName,
 Gender,
 NIC,
 Address,
 City,
 District,
 DOB,
 PhoneNo,
 Email,
 Username:username, // Include Username field
 Password: password, // Include Password field
 });
 // Save the new customer to the database
 await newCustomer.save();
 
 // Respond with a success message
 res.status(201).json({ status: "Account Created" });
 } catch (error) {
 console.error(error);
 // If there's an error, respond with a 500 status and an error message
 res.status(500).json({ status: "Error creating account", error: 
error.message });
 }
});
// Retrieve all customer accounts
router.get("/", async (req, res) => {
 try {
 const customers = await customer_account.find();
 res.json(customers);
 } catch (error) {
 console.error(error);
 res.status(500).json({ status: "Error retrieving accounts", error: 
error.message });
 }
});
// Update a customer account by ID
router.put("/update/:id", async (req, res) => {
 try {
 const userID = req.params.id;
 const updateAccount = req.body;
 await customer_account.findByIdAndUpdate(userID, updateAccount);
 res.status(200).send({ Status: "User Updated" });
 } catch (error) {
 console.error(error);
 res.status(500).send({ Status: "Error with updating data", error: 
error.message });
 }
});
// Delete a customer account by ID
router.delete("/delete/:id", async (req, res) => {
 try {
 const userID = req.params.id;
 await customer_account.findByIdAndDelete(userID);
 res.status(200).send({ Status: "User Deleted" });
 } catch (error) {
 console.error(error);
 res.status(500).send({ Status: "Error with deleting data", error: 
error.message });
 }
});
// Retrieve a single customer account by ID
router.get("/get/:id", async (req, res) => {
 try {
 const userID = req.params.id;
 const user = await customer_account.findById(userID);
 res.status(200).send({ Status: "User fetched", user });
 } catch (error) {
 console.error(error);
 res.status(500).send({ Status: "Error with fetching user", error: 
error.message });
 }
});
module.exports = router;