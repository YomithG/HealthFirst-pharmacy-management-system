const mongoose = require('mongoose')
const Product = require('../../Models/Product/productModel')

const createProduct = async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
    } catch (error) {
      throw new Error(error);
    }
};
const updateProduct = async (req, res) => {
    const {id} = req.params //get the id
    //check whether the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such item'})
    }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
};
const deleteProduct = async (req, res) => {
    const {id} = req.params //get the id
    //check whether the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such item'})
    }
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
};
const getProduct = async (req, res) => {
    const {id} = req.params //get the id
    //check whether the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such item'})
    }
  try {
    const getaProduct = await Product.findById(id);
    res.json(getaProduct);
  } catch (error) {
    throw new Error(error);
  }
};
const getallProduct = async (req, res) => {
    try {
      const getallProduct = await Product.find();
      res.json(getallProduct);
    } catch (error) {
      throw new Error(error);
    }
};
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getallProduct,
};
