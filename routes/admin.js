const express = require("express");

const adminAccess=require('../controllers/adminController')
const AuthController=require('../controllers/authController')
const router = express.Router();

router.get('/getUsers',AuthController.prodect,AuthController.restictTo('admin'),adminAccess.getUser)

module.exports=router