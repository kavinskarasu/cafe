const { query } = require('express');
const connect=require('../db')
const jwt=require('jsonwebtoken');
const nodemailer=require('../utils/email');
const router = require('../routes/user');
const { promisify } = require("util");




const  jwtVerify =async(token)=>{
  //const decoded = await promisify(jwt.verify)(token, process.env.JWT);
  var decoded = jwt.verify(token, process.env.JWT);
return decoded;
}
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
        }, process.env.JWT, { expiresIn: '1h' });
         
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
    
  
     exports.updateUser=(req,res)=>{
      let user=req.body;
      let query="update user set status=? where id =?"
      connect.query(query,[user.status,user.id],(err,result)=>{
        if(!err){
          if(results.affectedRows==0){
           return res.status(404).json({
              message:"user id does not exit"
            })
          }
          return res.status(200).json({
            status:"success",
            data:"user updated successfully"
          })
        }
        else{
          return res.status(500).json(err);
        }
      })
     }
     exports.checkout=(req,res)=>{

     
      return res.status(200).json({
        data:"true"
      })
     }

      exports.passwordChange=("/changePassword",(req,res)=>{
        const user=req.body;
        const email=req.email;
        const password=req.body.newPassword;
        //console.log(user,email,password,user.currentPassword)
        var query="select *from user where email=? and password=?"
        connect.query(query,[email,user.currentPassword],(err,results)=>{
          if(!err){
            console.log(results)
            if(results.length<=0){
              
              res.status(400).json({message:"Incorrect  old password"})
            }
            var query="update user set password=? where email=?"
            connect.query(query,[password,email],(err,results)=>{
              
              if(!err&&results.affectedRows==0){
               
                res.status(500).json({
                  status:"failure",
                  message:"User password is not updated please try again"
                })
              }
              else{
                res.status(200).json({
                  status:"success",
                  message:"user password updated successfuly"
                })
              }
            })
          }
          else{
            res.status(500).json({
              status:"failure",
              message:err
            })
          }
        })

});



exports.prodect=(req,res,next)=>{
  const authHeader=req.headers['authorization']
  const token = req.headers.authorization.split(" ")[2];
 
  jwt.verify(token, process.env.JWT, function(err, auth) {
    
  if (auth) {
  
    let query="select email,role from user where email=?"
    connect.query(query,[auth.responce.email],(err,result)=>{
  
     if(!err){
    
       req.email=result[0].email;
       req.role=result[0].role;
    
       next();
     }
   });
  }
  else{
    return res.status(401).json({
      status:"failue",
      data:"Can't access"
    })
  }
});
 
if(!token){
  return res.status(401).json({
    status:"failue",
    data:"Can't access"
  })

}
    


}


exports.restictTo=(role)=>{
  return (req,res,next)=>{
   
if(role==req.role){
  next();
}
else{
  return res.status(401).json({
    status:'faliure',
    data:`This page is access to only ${role}`

  })
}
}
}