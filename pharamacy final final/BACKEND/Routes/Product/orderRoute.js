//D:\Pasindi\SLIIT\Y2S2\ITP\express\backend\routes\orderRoute.js
const express = require("express");
const {
  createDetails,
  deleteDetails,
  getallDetails,
  getDetail,
} = require("../../controllers/Product/orderController");

const router = express.Router();

router.post('/',createDetails);
router.get("/", getallDetails);
router.get('/', getDetail);
router.delete("/:id", deleteDetails);

module.exports = router;