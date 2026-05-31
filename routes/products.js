const express = require("express");
const {
  getProducts,
  postAddProduct,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controller/products");

const router = express.Router();
// console.log("products router loaded");
router.post("/add-product", postAddProduct);
router.get("/getAll", getProducts);
router.get("/product/:id", getOneProduct);
router.put("/product/update/:id", updateOneProduct);
router.delete("/product/delete/:id", deleteOneProduct);

module.exports = router;
