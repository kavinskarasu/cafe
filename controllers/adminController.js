
const jwt=require('jsonwebtoken');
const connect = require("../db");



exports.getUser=(req,res)=>{
    
    let query="select id, name, email,contactNumber,status from user where role='user' "
    connect.query(query,(err,result)=>{
        if(!err){
           
  res.status(200).json({
    
    data:result
})
        }
        else{
            res.status(500).json(err);
        }
    })
}