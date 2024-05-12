const router = require("express").Router();
const Inventory = require("../../Models/Inventory/Inventory.js");

router.route("/add/inventorymedicine").post((req, res) => {
  const {
    BatchID,
    BatchName,
    ItemID,
    ItemName,
    ItemCategory,
    ItemSize,
    ItemBuyPrice,
    ItemSellPrice,
    SupplierID,
    SupplierName,
    ManufactureDate,
    ExpireDate,
    Quantity,
    Product,
  } = req.body;

  const newInventory = new Inventory({
    BatchID,
    BatchName,
    ItemID,
    ItemName,
    ItemCategory,
    ItemSize,
    ItemBuyPrice: parseFloat(ItemBuyPrice),
    ItemSellPrice: parseFloat(ItemSellPrice),
    SupplierID,
    SupplierName,
    ManufactureDate: new Date(ManufactureDate),
    ExpireDate: new Date(ExpireDate),
    Quantity: parseInt(Quantity),
    Product,
  });

  newInventory
    .save()
    .then(() => {
      res.json("Successfully Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.route("/").get((req, res) => {
  Inventory.find()
    .then((inventory) => {
      res.json(inventory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.route("/update/:id").put(async (req, res) => {
  const itemID = req.params.id + "";

  const {
    BatchID,
    BatchName,
    ItemID,
    ItemName,
    ItemCategory,
    ItemSize,
    ItemBuyPrice,
    ItemSellPrice,
    SupplierID,
    SupplierName,
    ManufactureDate,
    ExpireDate,
    Quantity,
  } = req.body;

  const updateInventory = {
    BatchID,
    BatchName,
    ItemID,
    ItemName,
    ItemCategory,
    ItemSize,
    ItemBuyPrice: parseFloat(ItemBuyPrice),
    ItemSellPrice: parseFloat(ItemSellPrice),
    SupplierID,
    SupplierName,
    ManufactureDate: new Date(ManufactureDate),
    ExpireDate: new Date(ExpireDate),
    Quantity: parseInt(Quantity),
  };

  try {
    const update = await Inventory.findByIdAndUpdate(itemID, updateInventory);
    if (!update) {
      return res.status(404).send({ status: "Item not found" });
    }
    res.status(200).send({ status: "Inventory item updated", item: update });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with updating data", error: err.message });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  const itemID = req.params.id;

  await Inventory.findByIdAndDelete(itemID)
    .then(() => {
      res.status(200).send({ status: "Inventory record deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting data ", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  const itemID = req.params.id;

  try {
    const item = await Inventory.findOne({ ItemID: itemID });
    res.status(200).send({ status: "Item fetched", item });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get Item", error: err.message });
  }
});

// Update item status route
router.put("/updateStatus/:id", async (req, res) => {
  const { id } = req.params;
  const { statusType, statusValue } = req.body;

  try {
    const inventoryItem = await Inventory.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    inventoryItem[statusType] = statusValue;
    await inventoryItem.save();

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get sold out items route
router.get("/soldOutList", async (req, res) => {
  try {
    const soldOutItems = await Inventory.find()
      .populate({
        path: "Product",
        match: { countInStock: { $lt: 5 } }, // Filtering based on countInStock
      })
      .exec();
    res.status(200).json(soldOutItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get expired items route
router.get("/expiredList", async (req, res) => {
  try {
    
    // if today date passed tht ExpireDate then it will be expired
    const expiredItems = await Inventory.find({
      ExpireDate: { $lt: new Date() },
    }).populate("Product");
    res.status(200).json(expiredItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete expired item route
router.delete("/expiredList/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    // Find the expired item by ID and delete it
    const deletedItem = await Inventory.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// Get demerged items route
router.get("/demergedList", async (req, res) => {
  try {
    const demergedItems = await Inventory.find({ Demerged: true });
    res.status(200).json(demergedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//supplier
router.route("/suppliers").get(async (req, res) => {
  try {
    const suppliers = await Inventory.distinct("SupplierName");
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
