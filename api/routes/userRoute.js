const express = require("express");
const {registerController, loginController}= require('../control/userController')
const router = express.Router();



//Create User
router.post("/register", registerController)

router.post("/login", loginController)

module.exports = router