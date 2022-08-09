const nodemailer=require('nodemailer');

var transporter = nodemailer.createTransport({
    host: process.env.Host,
    port: process.env.mailport,
    auth: {
      user:process.env.mailUsername,
      pass: process.env.mailPassword
    }
  });






  const mail=(mailOptions)=>{
   
  transporter.sendMail(mailOptions, function(error, info){
    
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response)
    }
  });
  }

  module.exports=mail;