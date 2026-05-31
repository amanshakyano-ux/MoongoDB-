const Order = require("../models/orders");

const createOrder = async (req, res, next) => {
  try {
    if (!req.user.cart.items || req.user.cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const user = await req.user.populate("cart.items.productId");

    const products = user.cart.items.map((i) => {
      return {
        quantity: i.quantity,
        product: i.productId,
      };
    });

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user._id,
      },
      products,
    });

    const result = await order.save();

    await req.user.clearCart();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: result._id,
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
      orders,
    });
    console.log("getOrders result for userId", userId, orders);
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, getOrders };
