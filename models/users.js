const getDb = require("../utils/db-connection").getDb;
const { ObjectId } = require("mongodb");
class User {
  constructor(name,age,address)
  {
    this.name = name,
    this.age = age,
    this.address = address
  }
  save()
  {
    const db = getDb()
    return db.collection("users").insertOne(this)
     .then(result=>{
       return result
     }
     )
     .catch(err=>{
      console.log(err)
      throw err(err.message)
     })
    
  }
  static getUserById (userId){
       const db = getDb()
       return db.collection("users").findOne({_id:new ObjectId(userId)})
         .then(result=>{
           return result
         })
         .catch(err=>{
          console.log(err)
          throw err(err.message)
         })
  }
}
module.exports = User;