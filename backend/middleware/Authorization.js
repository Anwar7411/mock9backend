const jwt=require("jsonwebtoken");
require('dotenv').config();


const Authorization=(req,res,next)=>{
    const token= req.headers?.authorization?.split(" ")[1];
    console.log(token)
    if(token){
     const decode= jwt.verify(token,`${process.env.secret_key}`);
     if(decode){
        const userId=decode.userId;
        req.body.userId=userId;
        next()
     }else{
        res.send("Please Login");
     }
    }else{
        res.send("Please Login") 
    }
}

module.exports={Authorization}