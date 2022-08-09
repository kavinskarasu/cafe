var mysql = require("mysql");
const dotenv=require('dotenv');
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
