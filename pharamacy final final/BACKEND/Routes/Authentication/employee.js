const router = require("express").Router();
const Employee = require("../../Models/Authentication/Employee_accounts.js");
// This route adds a new employee
router.route("/add_employee").post(async (req, res) => {
 try {
 const newEmployeeData = req.body;
 const newEmployee = new Employee(newEmployeeData);
 await newEmployee.save();
 res.status(201).json({ status: "Employee Registered" });
 } catch (error) {
 console.error(error);
 res.status(500).json({ status: "Error registering employee" });
 }
});
// This route retrieves all employees
router.route("/").get(async (req, res) => {
 try {
 const employees = await Employee.find();
 res.json(employees);
 } catch (err) {
 console.error(err);
 res.status(500).json({ status: "Error retrieving employees" });
 }
});
// This route updates an employee by ID
router.route("/update_employee/:id").put(async (req, res) => {
 const { id } = req.params;
 const updateEmployeeData = req.body;
 try {
 await Employee.findByIdAndUpdate(id, updateEmployeeData);
 res.status(200).json({ status: "Employee Updated" });
 } catch (err) {
 console.error(err);
 res.status(500).json({ status: "Error updating employee", error: 
err.message });
 }
});
// This route deletes an employee by ID
router.route("/delete_employee/:id").delete(async (req, res) => {
 const { id } = req.params;
 try {
 await Employee.findByIdAndDelete(id);
 res.status(200).json({ status: "Employee Deleted" });
 } catch (err) {
 console.error(err);
 res.status(500).json({ status: "Error deleting employee", error: 
err.message });
 }
});
// This route retrieves a single employee by ID
router.route("/get_employee/:id").get(async (req, res) => {
 const { id } = req.params;
 try {
 const employee = await Employee.findById(id);
 if (!employee) {
 return res.status(404).json({ status: "Employee not found" });
 }
 res.status(200).json({ status: "Employee fetched", employee });
 } catch (err) {
 console.error(err);
 res.status(500).json({ status: "Error fetching employee", error: 
err.message });
 }
});
module.exports = router;