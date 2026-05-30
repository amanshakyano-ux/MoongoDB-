const express = require("express")
const {getAddProduct,postAddProduct} = require("../controller/products")
const router = express.Router();

router.post("/add-product",postAddProduct)
// router.get("/products",getAddProduct)


module.exports = router;
