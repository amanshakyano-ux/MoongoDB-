require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const mongoConnect = require("./utils/db-connection").mongoConnect;
const productRoutes = require("./routes/products");
const userRoutes =require("./routes/users");
const User = require("./models/users");
const cartRoutes = require("./routes/carts");
const app = express();
app.use(express.json());

app.use((req, res, next) => { 
  User.getUserById("6a1af20224ea85865a3a5924")
  .then(user => {
    req.user = user;
    console.log('auth-middleware: attached req.user._id =', user && user._id);
    next();
  })
  .catch(err => {
    console.log('auth-middleware error:', err && err.message);
    next(err);
  });
});

app.use("/admin", productRoutes);
app.use("/user",userRoutes)
app.use("/cart", cartRoutes);

app.use((err,req,res,next)=>{
  res.status(500).json({success:false,message:err.message || "Backend issue"})
})

mongoConnect(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running");
  });
});
