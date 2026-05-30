const express = require("express");
const {
  getProducts,
  postAddProduct,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../controller/products");

const router = express.Router();

router.post("/add-product", postAddProduct);
router.get("/products", getProducts);
router.get("/product/:id", getOneProduct);
router.put("/product/update/:id", updateOneProduct);
router.delete("/product/delete/:id", deleteOneProduct);

module.exports = router;
