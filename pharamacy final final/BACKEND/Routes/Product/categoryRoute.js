const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,} = require("../../controllers/Product/categoryController");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// router.post("/", authMiddleware, isAdmin, createCategory);
// router.put("/:id", authMiddleware, isAdmin, updateCategory);
// router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.post('/',createCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;