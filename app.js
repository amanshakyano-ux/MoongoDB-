require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express")
const mongoConnect = require("./utils/db-connection").mongoConnect
const productRoutes = require('./routes/products') 

  
 
const app = express()
app.use(express.json());

 app.use("/admin",productRoutes)
 

mongoConnect(()=>{
    
    app.listen(process.env.PORT,()=>{
        console.log("Server is running")
    })

})



