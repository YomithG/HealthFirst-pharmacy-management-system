const express = require("express");
const {
  orderController,
  updateDetails,
  deleteDetails,
  getallDetails,
  getDetail,
  updateStatus,
  getOrder} = require("../../controllers/Product/oDetailsController");

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", getallDetails);
router.get('/', getDetail);
router.put("/:id", updateDetails);
router.put("/updateStatus/:id", updateStatus);
router.delete("/:id", deleteDetails);
router.get("/:orderId", getOrder);


module.exports = router;

