const express = require("express");
const { query } = require("../db");

const router = express.Router();
const jwt=require('jsonwebtoken');
const connect = require("../db");
const AuthController=require('../controllers/authController')
router.post("/signup",AuthController.signup) 
router.post('/login',AuthController.login)
router.post("/forgetPassword",AuthController.forgotPassword);



module.exports = router;
