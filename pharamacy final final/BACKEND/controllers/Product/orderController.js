//D:\Pasindi\SLIIT\Y2S2\ITP\express\backend\controllers\orderController.js
const Details = require("../../Models/Product/orderModel");
const Product = require("../../Models/Product/productModel")
const mongoose = require('mongoose')
const { Z } = require ("zod")

const createDetails = async (req, res) => {
    try {
      const { item_id, amount, total} = req.body;
      // Check if all required fields are present
      if (!item_id || !amount || !total) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const newDetails = await Details.create(req.body);
      res.json(newDetails);
    }catch (error) {
      throw new Error(error);
    }
};
const deleteDetails = async (req, res) => {
    const {id} = req.params //get the id
    //check whether the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such item'})
    }
  try {
    const deletedDetails = await Details.findByIdAndDelete(id);
    res.json(deletedDetails);
  } catch (error) {
    throw new Error(error);
  }
};

const getallDetails = async (req, res) => {
    try {
      const getallDetails = await Details.find();
      res.json(getallDetails);
    } catch (error) {
      throw new Error(error);
    }
};
//// Fetch delivery details associated with the current user
const getDetail = async (req, res) => {
    try {
        const userDeliveryDetails = await DeliveryDetail.find({ userId: req.user._id });
        res.json(userDeliveryDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch delivery details" });
    }
  };

  module.exports = {
    createDetails,
    deleteDetails,
    getallDetails,
    getDetail,
  };