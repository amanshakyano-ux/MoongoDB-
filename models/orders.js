const getDb = require("../utils/db-connection").getDb;
const { ObjectId } = require("mongodb");
function toObjectId(id) {
  return id instanceof ObjectId ? id : new ObjectId(id);
}
class Order {
  static async createOrder(userId, cartItems) {
    try {
      const db = getDb();
      const uid = toObjectId(userId);

      const cart = await db.collection("carts").findOne({ userId: uid });
      if (!cart) {
        throw new Error("Cart not found for user");
      }
      if (!cart.items || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }
     const result =  await db.collection("orders").insertOne({
        userId: uid,
        items: cart.items,
        createdAt: new Date(),
      });
      await db.collection("carts").deleteOne({ userId: uid });
      return result;
    } catch (err) {
      console.log("Error in createOrder for userId", userId, err);
      throw err;
    }
  }

  static async getOrderByUserId(userId){
    try{
        const db = getDb();
        const uid = toObjectId(userId);
        const orders = await db.collection("orders").find({userId:uid}).toArray();
        return orders;

    }catch(err){
        console.log("Error in getOrderByUserId for userId", userId, err);
        throw err;
    }
  }
}
module.exports = Order;
