const router = require("express").Router();
const Medicine = require("../../models/Inventory/Medicine.js");

router.route("/add/newmedicine").post((req, res) => {
    const {
      BatchID,
      BatchName,
      ItemID,
      ItemName,
      ItemCategory,
      ItemSize,
      SupplierID,
      SupplierName,
    } = req.body;
    const newMedicine = new Medicine({
      BatchID,
      BatchName,
      ItemID,
      ItemName,
      ItemCategory,
      ItemSize,
      SupplierID,
      SupplierName
    });
  
  newMedicine.save()
    .then(() => {
      res.json("Successfully Added.");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});


router.route("/").get((req, res) => {
    Medicine.find()
        .then((medicines) => {
            res.json(medicines);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    const itemID = req.params.id;
    const {
        BatchID,
        BatchName,
        ItemID,
        ItemName,
        ItemCategory,
        ItemSize,
        SupplierID,
        SupplierName
    } = req.body;

    const updateMedicine = {
        BatchID,
        BatchName,
        ItemID,
        ItemName,
        ItemCategory,
        ItemSize,
        SupplierID,
        SupplierName
    };

    try {
        const update = await Medicine.findOneAndUpdate({ ItemID: itemID }, updateMedicine);
        res.status(200).send({ status: "Item updated", item: update });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    const itemID = req.params.id;

    await Medicine.findByIdAndDelete(itemID).then(() =>{
    
        res.status(200).send({status: "Medicine record deleted"})  
    }).catch((err) => { 
    
        console.log(err);
        res.status(500).send({status: "Error with deleting data ",error: err.message });
    })
});

router.route("/get/:id").get(async (req, res) => {
    const itemID = req.params.id;

    try {
        const item = await Medicine.findOne({ ItemID: itemID });
        res.status(200).send({ status: "Item fetched", item });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get Item", error: err.message });
    }
});

module.exports = router;
