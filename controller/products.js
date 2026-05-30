const Product = require("../models/products");

const postAddProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const userId = req.user._id;
    const product = new Product(name, price, quantity, userId);
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
      .json({ success: false, message: "Error from get Controller" });
  }
};

const getProducts = async (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    console.log(`Product ${product}`);
    res.send(product);
  } catch (err) {
    console.log("Funtion err");
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {
      title: req.body.title,
      price: req.body.price,
      quantity: req.body.quantity,
    };
    const product = await Product.updateProduct(id, updateData);
    res.send(product);
  } catch (err) {
    console.log("updateFuncError");
    res.status(500).json({ success: false, message: err.message });
  }
};
const deleteOneProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.deleteProduct(id);
    res.send(result);
  } catch (err) {
    console.log("delete FUn Error");
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = {
  postAddProduct,
  getProducts,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
