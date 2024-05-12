const router = require("express").Router();
const Account = require("../../Models/Login/customer_account");
// This route adds a new customer account
router.route("/add").post(async (req, res) => {
  try {
    const {
      FullName,
      Gender,
      NIC,
      Address,
      City,
      District,
      DOB,
      PhoneNo,
      Email
    } = req.body;

    const newCustomer = new Account({
      FullName,
      Gender,
      NIC,
      Address,
      City,
      District,
      DOB,
      PhoneNo,
      Email
    });

    await newCustomer.save();
    res.status(201).json({ status: "Account Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error creating account" });
  }
});

// This route retrieves all customer accounts
router.route("/").get((req,res)=>{
  Account.find().then((customers)=>{
    res.json(customers);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({ status: "Error retrieving accounts" });
  });
});

// This route updates a customer account by ID
router.route("/update/:id").put(async(req,res)=>{
  let userID = req.params.id;

  const {
    FullName,
    Gender,
    NIC,
    Address,
    City,
    District,
    DOB,
    PhoneNo,
    Email
  } = req.body;

  const updateAccount = {
    FullName,
    Gender,
    NIC,
    Address,
    City,
    District,
    DOB,
    PhoneNo,
    Email
  };

  try {
    await Account.findByIdAndUpdate(userID, updateAccount);
    res.status(200).send({ Status: "User Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ Status: "Error with updating data", error: err.message });
  }
});

// This route deletes a customer account by ID
router.route("/delete/:id").delete(async(req,res)=>{
  let userID = req.params.id;

  try {
    await Account.findByIdAndDelete(userID);
    res.status(200).send({ Status: "User Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ Status: "Error with deleting data", error: err.message });
  }
});

// This route retrieves a single customer account by ID
router.route("/get/:id").get(async (req,res) =>{
  let userID = req.params.id;

  try {
    const user = await Account.findById(userID);
    res.status(200).send({ Status: "User fetched", user: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ Status: "Error with fetching user", error: err.message });
  }
});

module.exports = router;
