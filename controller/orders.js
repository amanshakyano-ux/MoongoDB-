const Order = require("../models/orders");

const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await Order.createOrder(userId);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: result.insertedId
    });
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.getOrderByUserId(userId);
    res.status(200).json({
      success: true,
      orders
    });
    console.log("getOrders result for userId", userId, orders);
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, getOrders };