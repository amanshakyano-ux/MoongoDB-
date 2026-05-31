// utils/db-connection.js
require("dotenv").config();
const mongoose = require("mongoose");

const mongoConnect = async (callback) => {
  try {
    await mongoose.connect(
      `mongodb+srv://amanshakyano_db_user:${process.env.MONGO_DB_PASSWORD}@cluster0.fjdefmi.mongodb.net/shop?retryWrites=true&w=majority`,
    );
    callback();

    console.log("MONGOOSE CONNECTED");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = mongoConnect;
