const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  BatchID: {
    type: String,
    required: true,
  },
  BatchName: {
    type: String,
    required: true,
  },
  ItemID: {
    type: String,
    required: true,
  },
  ItemName: {
    type: String,
    required: true,
  },
  ItemCategory: {
    type: String,
    required: true,
  },
  ItemSize: {
    type: String,
    required: true,
  },
  ItemBuyPrice: { type: Number, required: true },
  ItemSellPrice: { type: Number, required: true },
  SupplierID: {
    type: String,
    required: true,
  },
  SupplierName: {
    type: String,
    required: true,
  },
  ManufactureDate: {
    type: Date,
    required: true,
  },
  ExpireDate: { type: Date, required: true },
  Quantity: { type: Number, required: true },
  SoldOut: { type: Boolean, default: false },
  Expired: { type: Boolean, default: false },
  Demerged: { type: Boolean, default: false },
  Product: {
    type: Schema.Types.ObjectId,
    ref: "productS",
  },
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
