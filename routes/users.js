const express = require("express")
const router = express.Router();
const {createUser,findUserById}=  require("../controller/users")
router.post("/create",createUser)
router.get("/:userId",findUserById)

module.exports = router