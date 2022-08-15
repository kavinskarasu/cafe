const express = require("express");

const router = express.Router();


const AuthController=require('../controllers/authController')

router.post("/signup",AuthController.signup) 
router.post('/login',AuthController.login)
router.post("/forgetPassword",AuthController.forgotPassword);
router.patch("/editAccount",AuthController.prodect,AuthController.updateUser)
router.patch("/changePassword",AuthController.prodect,AuthController.passwordChange);


module.exports = router;
