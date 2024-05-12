//D:\Pasindi\SLIIT\Y2S2\ITP\express\backend\controllers\oDetailsController.js
const Details = require("../../Models/Product/oDetailsModel");
const Product = require("../../Models/Product/productModel")
const {z} = require("zod")
const mongoose = require('mongoose');

const createOrderSchema = z.object({
  // customerId: z.string(), // currently logged in user id
  
  name: z.string(),
  address: z.string(),
  city: z.string(),
  contactNo : z.number(),
  orderItems: z.array(
    z.object({
      product: z.string(),
      title: z.string(),
      quantity: z.number(),
      price: z.number()
    })
  ),
  totalPrice: z.number(),
});

const orderController = {
  // create order
  createOrder: async (req, res) => {
    try {
      const {
        // customerId, // currently logged in user id
        orderItems,
        name,
        address,
        city,
        contactNo,
        totalPrice,
      } = req.body;

      // validation
      createOrderSchema.parse(req.body);

      const orderItemsWithTitles = await Promise.all(orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found`);
        }
        return {
          ...item,
          title: product.title, // Fetch title from product
          price: product.price,
        };
        
      }));

      const newOrder = new Details({
        // customer: customerId, // currently logged in user id
        
        name,
        address,
        city,
        contactNo,
        orderItems: orderItemsWithTitles,
        totalPrice,
      });

      const savedOrder = await newOrder.save();

    // update product stock
    for (let i = 0; i < orderItemsWithTitles.length; i++) {
      const { product, quantity } = orderItemsWithTitles[i];

      const productDetails = await Product.findById(product);

      if (!productDetails) {
        throw new Error(`Product with ID ${product} not found`);
      }
        productDetails.countInStock = productDetails.countInStock - quantity;

        await productDetails.save();
      }

      res.status(201).json({
        success: true,
        order: savedOrder,
        message: "Order created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};


const updateStatus = async (req, res) => {
  const { id } = req.params; // Get the ID from the request params

  try {
      // Update the detail in the database using findByIdAndUpdate
      const updatedDetail = await Details.findByIdAndUpdate(id, {status: "Accepted"});

      if (!updatedDetail) {
          return res.status(404).json({ error: 'No such item' });
      }

      // Send the updated detail back to the client
      res.json(updatedDetail);
  } catch (error) {
      console.error('Error updating detail: ', error);
      res.status(500).json({ error: 'Failed to update item' });
  }
};

const updateDetails = async (req, res) => {
  const { id } = req.params; // Get the ID from the request params

  try {
      // Update the detail in the database using findByIdAndUpdate
      const updatedDetail = await Details.findByIdAndUpdate(id, req.body, {
          new: true, // Return the updated document
      });

      if (!updatedDetail) {
          return res.status(404).json({ error: 'No such item' });
      }

      // Send the updated detail back to the client
      res.json(updatedDetail);
  } catch (error) {
      console.error('Error updating detail: ', error);
      res.status(500).json({ error: 'Failed to update item' });
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

const getOrder = async (req, res) => {
  try {
    console.log(req.params.orderId)
    const orderId = req.params.orderId
      const userDeliveryDetails = await Details.findById(orderId);
      console.log(userDeliveryDetails)
      res.json(userDeliveryDetails);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch delivery details" });
  }
};
module.exports = {
  orderController,
  updateDetails,
  deleteDetails,
  getallDetails,
  getDetail,
  getOrder,
  updateStatus
};