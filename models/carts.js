const getDb = require("../utils/db-connection").getDb;
const { ObjectId } = require("mongodb");

function toObjectId(val) {
  if (!val) throw new Error("userId/productId is required");
  if (val instanceof ObjectId) return val;
  if (typeof val === "string") return new ObjectId(val);
  // val might be a document with _id
  if (val && val._id) return val._id instanceof ObjectId ? val._id : new ObjectId(val._id);
  return new ObjectId(val.toString());
}

class Cart {
  static async addProduct(userId, productId) {
    const db = getDb();

    const uid = toObjectId(userId);
    const pid = toObjectId(productId);

    // User ka cart find karo
    let cart = await db.collection("carts").findOne({
      userId: uid,
    });

    // Cart exist nahi karta
    if (!cart) {
      return db.collection("carts").insertOne({
        userId: uid,
        items: [
          {
            productId: pid,
            quantity: 1,
          },
        ],
      });
    }

    // Product cart mein pehle se hai?
    const existingProductIndex = cart.items.findIndex((item) =>
      item.productId.toString() === pid.toString()
    );

    if (existingProductIndex >= 0) {
      // Quantity increase
      cart.items[existingProductIndex].quantity += 1;
    } else {
      // Naya product add
      cart.items.push({
        productId: pid,
        quantity: 1,
      });
    }

    return db.collection("carts").updateOne(
      { _id: cart._id },
      { $set: { items: cart.items } }
    );
  }

  static getCart(userId) {
    const db = getDb();
    const uid = toObjectId(userId);

    return db.collection("carts").findOne({
      userId: uid,
    })
    .then(cart=>{
        if(!cart) {
            throw new Error("Cart not found for userId " + userId);
        }
        return cart;
    })
    .catch(err=>{
        console.log("Error in getCart for userId", userId, err);
        throw err;
    })
  }
}

module.exports = Cart;