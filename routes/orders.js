const express = require('express');
const router = express.Router();

const {createOrder,getOrders} = require("../controller/orders");

router.post("/create", createOrder);
router.get("/my-orders", getOrders);

module.exports = router;

