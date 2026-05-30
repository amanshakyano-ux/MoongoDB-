const Cart = require("../models/carts");

const addToCart = async (req, res) => {
  try {
    // prefer authenticated user from middleware, fall back to body
    let userId = req.user && req.user._id ? req.user._id : req.body.userId;
    const { productId } = req.params;

    if (!userId) {
      console.log("addToCart: missing userId", { reqUser: req.user, body: req.body });
      return res.status(400).json({ success: false, message: "userId missing" });
    }

    if (!productId) {
      console.log("addToCart: missing productId", { params: req.params });
      return res.status(400).json({ success: false, message: "productId missing" });
    }

    console.log("addToCart called with", { userId: userId.toString ? userId.toString() : userId, productId });

    const result = await Cart.addProduct(userId, productId);

    console.log("addToCart result", result && result.acknowledged ? "insert/update ok" : result);

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      result,
    });
  } catch (err) {
    console.log("Error in addToCart:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
     console.log("getCart called with params", req.params, "and req.user", req.user && { _id: req.user._id, name: req.user.name });
    // accept :userId param or use req.user
    const userId = req.params.userId || (req.user && req.user._id);

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId missing" });
    }

    const cart = await Cart.getCart(userId);
    
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.log("Error in getCart:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeItemFromCart = async(req,res,next)=>{
  try{

    const userId = req.user._id;
    const { productId } = req.params;

    

    await Cart.removeItemFromCart(userId, productId);

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    console.log("Error in removeItemFromCart:", err);
    next(err);
  }
}

module.exports = { addToCart, getCart,removeItemFromCart };