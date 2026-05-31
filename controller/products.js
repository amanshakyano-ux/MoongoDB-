const Product = require("../models/products");

const postAddProduct = async (req, res, next) => {
  try {
    const { title, price, quantity } = req.body;
    const userId = req.user._id;
    const product = new Product({
      title,
      price,
      quantity,
      userId,
    });
    await product
      .save()
      .then((result) => {
        console.log("Product Created");

        res.status(201).json({ success: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    // .select("title price quantity -_id")
    // .populate("userId","name email");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    next(err);
  }
};

const getOneProduct = async (req, res, next) => {
  try {
    const pid = req.params.id;
    const product = await Product.findById(pid);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

const updateOneProduct = async (req, res, next) => {
  try {
    const pid = req.params.id;

    const updateData = {
      title: req.body.title,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};
const deleteOneProduct = async (req, res, next) => {
  try {
    const pid = req.params.id;
    const result = await Product.findByIdAndDelete(pid);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  postAddProduct,
  getProducts,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
