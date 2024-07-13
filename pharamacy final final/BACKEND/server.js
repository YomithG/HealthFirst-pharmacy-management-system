const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// connect to database
const URL = process.env.MONGODB_URL;

// App configurations
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Connection
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection Success!");
});



//inventory
const inventoryRouter = require("./Routes/Inventory/inventory.js");
const medicineRouter = require("./Routes/Inventory/medicine.js");
const feedbackRoutes = require('./Routes/Feedback/feedbacks')
const formRouter = require("./Routes/SupplierManagement/forms.js");



const deliveryRouter = require("./Routes/Delivery/deliverys.js");

const complaintRoutes = require('./Routes/Inquiry/complaints');
const orderRoutes = require('./Routes/Product/orderRoute');
const categoryRoutes = require('./Routes/Product/categoryRoute');
const productRoutes = require('./Routes/Product/productRoute');
const detailsRoutes = require('./Routes/Product/oDetailsRoute');

//Attendance
const salaryRoutes = require('./Routes/Attendance/salary')
const attdRoutes = require('./Routes/Attendance/attendance')
const leaveRoutes = require('./Routes/Attendance/leave')
const bonusRoutes = require('./Routes/Attendance/bonus')

const AccountRouter = require("./Routes/Authentication/customer.js");
const employeeRouter = require("./Routes/Authentication/employee.js");


//load the Accounts.js file
app.use("/customer_account",AccountRouter);
app.use("/inventory",inventoryRouter);
app.use("/medicine",medicineRouter);
app.use('/api/feedbacks', feedbackRoutes)
app.use('/api/complaints', complaintRoutes);
app.use("/form", formRouter);

//app.use('/api/salary', salaryRoutes)
//app.use('/api/attendance', attdRoutes)
//app.use('/api/leave', leaveRoutes)

app.use("/delivery", deliveryRouter);

// Define routes
app.use('/api/orders', orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
//to get only the specific user's details
//app.use("/api/delivery_details", authenticateUser, detailsRoutes);
app.use("/api/delivery_details", detailsRoutes); //instead of this use the above one.

app.use('/api/salary', salaryRoutes)
app.use('/api/attendance', attdRoutes)
app.use('/api/leave', leaveRoutes)
app.use('/api/bonus', bonusRoutes)

app.use("/customer_account", AccountRouter);
app.use("/employee_accounts", employeeRouter);



app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
});





