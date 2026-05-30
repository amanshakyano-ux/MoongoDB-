const getDb = require("../utils/db-connection").getDb;
const { ObjectId } = require("mongodb");

function toObjectId(id) {
  return id instanceof ObjectId
    ? id
    : new ObjectId(id);
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

  static async removeItemFromCart(userId, productId) {
  const pid = toObjectId(productId);

  const cart = await this.getCart(userId);

  const updatedItems = cart.items.filter((item) => {
    return item.productId.toString() !== pid.toString();
  });

  return this.updateCart(userId, updatedItems);
}


 static async removeItemFromCart(userId, productId) {
  const db = getDb();

  const uid = toObjectId(userId);
  const pid = toObjectId(productId);

    const cart = await this.getCart(userId);

  const itemExists = cart.items.some((item) => {
    return item.productId.toString() === pid.toString();
  });

  if (!itemExists) {
    const error = new Error("Product not found in cart");
    error.statusCode = 404;
    throw error;
  }

  // 2. Product ko cart items se remove karo
  const updatedItems = cart.items.filter((item) => {
    return item.productId.toString() !== pid.toString();
  });

  // 3. Cart update karo
  return db.collection("carts").updateOne(
    { userId: uid },
    {
      $set: {
        items: updatedItems,
      },
    }
  );
}
}

module.exports = Cart;