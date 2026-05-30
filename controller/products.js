const Product = require("../models/products")
const  postAddProduct= async(req,res)=>{
try{
    console.log("Post Api Hit")
    const {name,price} = req.body;
    const product = new Product(name,price)
   await product.save()
    .then((result)=>{
        console.log("Product Created")
    
        res.status(201).json({success:true})
    })
    .catch((err)=>{
        console.log(err)
    })


}catch(err)
{
 res.status(500).json({success:false,message:"Error from get Controller"})
}
}

// const  getAddProduct = async()=>{
// console.log("POST api hit")
// }

module.exports = {
    postAddProduct
}