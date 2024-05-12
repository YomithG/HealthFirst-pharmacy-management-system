const express = require("express");
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getallProduct,} = require("../../controllers/Product/productController");

const router = express.Router();
router.post('/',createProduct);
router.get("/:id", getProduct);
router.get("/", getallProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;