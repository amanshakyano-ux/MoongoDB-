const express = require("express");
const router = express.Router();

 const {addToCart,getCart,removeItemFromCart} = require("../controller/carts");

router.post("/:productId", addToCart);

router.get("/getAllCartItem", getCart);

router.delete("/deleteCartItem/:productId", removeItemFromCart);

module.exports = router;