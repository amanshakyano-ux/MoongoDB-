require("dotenv").config();
 
const mongodb = require("mongodb");
let _db;
const MongoClient = mongodb.MongoClient;
const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://amanshakyano_db_user:${process.env.MONGO_DB_PASSWORD}@cluster0.fjdefmi.mongodb.net/shop?appName=Cluster0`,
  )
    .then((client) => {
      console.log("MONGO_DB CONNECTED");
      _db = client.db()
      callback()
      
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb  = ()=>{
  if(_db)
  {
return _db;
  }
  throw "No database found!"
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

