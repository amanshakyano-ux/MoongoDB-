const User = require("../models/users");

const createUser  = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;
        const result = new  User({name,email,password})
        await result.save()
        res.status(201).json({success:true,message:"User created"})
         
    }catch(err)
    {
        next(err)
    }
}

const findUserById = async (req,res,next)=>{
    try{
        
        const {userId} = req.params
        const result = await User.getUserById(userId)
        res.status(200).json({success:true,user:result})
    }catch(err){
        next(err)
    }
}
module.exports   = {createUser,findUserById}