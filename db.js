var mysql = require("mysql");
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');
dotenv.config();
var con = mysql.createConnection({
  port:3306,
  user: 'root',
  password:'password',
  host: 'localhost',
  database: 'cafe',
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;



exports.tokenVerify=(req,res)=>{
  const authHeader=req.headers['authorization'];
  const token =authHeader && authHeader.split(' ')[0];
  if(token==null){
    return res.status(401);
  }
  jwt.verify()
}