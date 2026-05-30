const Product = require("../models/products");

const postAddProduct = async (req, res) => {
  try {
    const { title, price, quantity } = req.body;
    // const userId = req.user._id;
    const product = new Product({
      title: title,
      price: price,
      quantity: quantity,
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
    res
      .status(500)
      .json({
        success: false,
        message: "Error from get Controller",
        err: err.message,
      });
  }
}


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOneProduct = async (req, res,next) => {
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

    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      updateData,
      { new: true }
    );

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
const deleteOneProduct = async (req, res,next) => {
  try {
    const pid = req.params.id;
    const result = await Product.findByIdAndDelete(pid);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
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
