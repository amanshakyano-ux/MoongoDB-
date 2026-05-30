const express = require("express");
const router = express.Router();

 const {addToCart,getCart} = require("../controller/carts");

router.post("/:productId", addToCart);

router.get("/getAllCartItem", getCart);

module.exports = router;