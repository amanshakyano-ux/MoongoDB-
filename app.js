require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const mongoConnect = require("./utils/db-connection").mongoConnect;
const productRoutes = require("./routes/products");
const userRoutes =require("./routes/users");

const app = express();
app.use(express.json());

app.use("/admin", productRoutes);
app.use("/user",userRoutes)

app.use((err,req,res,next)=>{
  res.status(500).json({success:false,message:err.message || "Backend issue"})
})

mongoConnect(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running");
  });
});
