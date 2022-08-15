
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

exports.category=(req,res,next)=>{
    let category=req.body;
  let  query="insert into category (name) values(?)";
connect.query(query,[category.name],(err,results)=>{
    if(!err){
        return res.status(200).json({
            message:"new category added sucessfully "
        })
    }
    else{
        return res.status(500).json({
            message:err
        })
    }
})
}

exports.getAllCategory=(req,res,next)=>{
    let query="select * from category order by name";
    connect.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json({
                message:results
            })
        }
        else{
            return res.status(500).json({
                message:err
            })
        }
    })
}

exports.updateCategory=(req,res,next)=>{
    let prodect=req.body;
    console.log(prodect.name,prodect.id);
    let query="updated category set name=? where id=?";
    connect.query(query,[prodect.name,prodect.id],(err,results)=>{
        if(!err){
            if(results.affectedRows<=0){
                return res.status(404).json({
                    message:"product not found"
                })
            }
            return res.status(200).json({
                message:"product updated successfully"
            })
        }
        return res.status(500).json({
            message:err
        })
       
    })
}