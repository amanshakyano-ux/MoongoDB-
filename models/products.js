const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
});

module.exports = mongoose.model("Product", productSchema);

// const getDb = require("../utils/db-connection").getDb;
// const { ObjectId } = require("mongodb");
// class Product {
//   constructor(title, price, quantity, userId) {
//     this.title = title;
//     this.price = price;
//     this.quantity = quantity;
//     this.userId = userId;
//   }
//   save() {
//     const db = getDb();
//     return db.collection("products").insertOne(this);
//   }
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => {
//         console.log(`Error from findById function in model ${err.message}`);
//       });
//   }
//   static updateProduct(prodId, updateData) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .updateOne({ _id: new ObjectId(prodId) }, { $set: updateData })
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//         return;
//       });
//   }

//   static deleteProduct(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new ObjectId(prodId) })
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => {
//         return err;
//       });
//   }
// }

// module.exports = Product;
