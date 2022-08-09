const { query } = require('express');
const connect=require('../db')
const jwt=require('jsonwebtoken');
const nodemailer=require('../utils/email')
exports.signup=async(req, res) => {
    let user = req.body;
   let  query = "select email ,password, role ,status from user where email=?";
     connect.query(query, [user.email], (err, results) => {
      if (!err) {
        if (results.length <= 0) {
          query =
            "insert into user(email,password,name,contactNumber,status,role)values(?,?,?,?,'false','user')";
          connect.query(
            query,
            [user.email, user.password, user.name, user.contactNumber],
            (err, results) => {
              if (!err) {
                var mailOptions = {
                  from: `${process.env.admin_email}`,
                  to: `${user.email}`,
                  subject: 'Sending Email using Node.js',
                  text: 'That was easy!'
                };
               nodemailer(mailOptions),
                res.status(200).json({
                 
                  status: "success",
                  data: results,
                });
              }
              if (err) {
                res.status(500).json({
                  status: "faliure",
                  data: err,
                });
              }
            }
          );
        } else {
          res.status(400).json({
            status: "failure",
            data: "Email Already exit please use another email",
          });
        }
      }
    });
  };
  

  exports.login=async(req,res)=>{
    let user=req.body;
    let query="select email, password, role,status from user where email=? ";
    connect.query(query,[user.email],(err,results)=>{
      if(!err){
      if(results.length<1||user.password!=results[0].password){
       res.status(401).json({
        status:"faliure",
        data:"Invalid email id or password"
       })
      
      }
      else if(results[0].status=="false"){
        res.status(401).json({
          status:"faliure",
          data:"please acctivate your account"
        })
      }
      else if(results[0].password==user.password){
        const responce={
          email:results[0].email,
          role:results[0].role
        }
       const accesstoken=  jwt.sign({
        responce
        }, 'secret', { expiresIn: '1h' });
         
        res.status(200).json({
          status:"success",
          data:"Logged in successfull",
          accesstoken
        })
      }
      else{
        res.status(500).json({
          status:"failure",
          data:"Something went wrong"
        })
      }
  
    }
    if(err){
      res.status(500).json({
        status:"failure",
        data:err
      })
    }
  
    })
  }

  

  exports.forgotPassword=async(req,res)=>{
    const user=req.body;
   let query="select email,password from user where email=?";
    connect.query(query,[user.email],(err,results)=>{
        if(!err){
        if(results.length<=0){
            res.status(200).json({
                status:"success",
                data:"password has been send to your email"
            })
        }
        else{
            var mailOptions = {
                from: `${process.env.admin_email}`,
                to: `${user.email}`,
                subject: 'get your password',
                text: `${results[0].password}`
              };
             nodemailer(mailOptions),
              res.status(200).json({
               
                status: "success",
                data: results,
              });
            
        }
    }
       
        if(err){
            res.status(200).json({
                status:"failure",
                data:err
            })
        }
     } )}
    
  