const getDb = require("../utils/db-connection").getDb;
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
  }
  save() {
    const db = getDb();
    return db.collection("products").insertOne(this);
  }
}

module.exports = Product;
