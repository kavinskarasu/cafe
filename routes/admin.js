const express = require("express");

const adminAccess=require('../controllers/adminController')
const AuthController=require('../controllers/authController')
const router = express.Router();

router.get('/getUsers',AuthController.prodect,AuthController.restictTo('admin'),adminAccess.getUser)
router.post("/addCategory",AuthController.prodect,AuthController.restictTo('admin'),adminAccess.category);
router.get('/getCategory',AuthController.prodect,adminAccess.getAllCategory);
router.patch('/update',AuthController.prodect,AuthController.restictTo('admin'),adminAccess.updateCategory)
module.exports=router