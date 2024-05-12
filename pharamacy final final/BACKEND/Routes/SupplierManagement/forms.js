const router = require("express").Router();
const Form = require("../../Models/SupplierManagement/Form");

// Create -> POST Method
router.route("/add").post((req, res) => {
  const { Supplier, Email, Medicine, Quantities, Notes } = req.body;

  // Ensure Medicine is converted to a string
  const medicineString = Array.isArray(Medicine) ? Medicine.join(", ") : Medicine;

  // Convert Quantities object to an array of objects
  const quantityArray = Object.entries(Quantities).map(([medicine, quantity]) => ({
    medicine,
    quantity: isNaN(quantity) ? 0 : Number(quantity)
  }));

  const newForm = new Form({
    Supplier,
    Email,
    Medicine: medicineString,
    Quantity: quantityArray,
    Notes
  });

  newForm
    .save()
    .then(() => {
      res.json("Form Filled");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});


// Read -> GET Method
router.route("/").get((req, res) => {
  Form.find()
    .then((forms) => {
      res.json(forms);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error: " + err);
    });
});

// Update -> PUT Method
router.route("/update/:id").put(async (req, res) => {
  const formID = req.params.id;
  const { Supplier, Email, Medicine, Quantity, Notes } = req.body;

   // Ensure Medicine is converted to a string
   const medicineString = Array.isArray(Medicine) ? Medicine.join(", ") : Medicine;

   // Ensure Quantity is converted to a number
   const quantityNumber = isNaN(Quantity) ? 0 : Number(Quantity);
  const updateForm = {
    Supplier,
    Email,
    Medicine: medicineString,
    Quantity: quantityNumber,
    Notes
  };

  await Form.findByIdAndUpdate(formID, updateForm)
    .then(() => {
      res.status(200).json({ status: "Form Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ status: "Error with updating form", error: err.message });
    });
});

// Delete
router.route("/delete/:id").delete(async (req, res) => {
  const formID = req.params.id;
  await Form.findByIdAndDelete(formID)
    .then(() => {
      res.status(200).json({ status: "Form Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ status: "Error with deleting form", error: err.message });
    });
});

// Get one user data
router.route("/get/:id").get(async (req, res) => {
  const formID = req.params.id;
  await Form.findById(formID)
    .then((form) => {
      res.status(200).json({ status: "Form Fetched", form });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ status: "Error with getting user", error: err.message });
    });
});

module.exports = router;
