const express=require('express');
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');
const cors=require('cors');
require('dotenv').config();

const {connection}=require("./Server");
const {UserModel}=require("./modules/User.model");
const {BugRoute} = require("./routes/Bugs.route");
const { Authorization } = require('./middleware/Authorization');


const app=express();

app.use(express.json());

app.use(cors({
    origin:'*'
}));

app.post("/signup",async (req,res)=>{
    const {email,password}=req.body;
    try{
    const user=await UserModel.find({email});
    if(user[0]?.email){
        res.send("User Already Exist")
    }else{
        bcrypt.hash(password,4,async function(err,hash){
            const data=await UserModel.create({email,password:hash})
            res.send("Signup Successfull")
        })
    }
    }
    catch(err){
     console.log(err);
     res.send("something went wrong!");
    }
})

app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
    const user=await UserModel.find({email});
    if(user.length>0){
        const hashed_password=user[0].password
         bcrypt.compare(password,hashed_password,function(err,result){
            if(result){
                const token=jwt.sign({userId:user[0]._id},`${process.env.secret_key}`);
                res.send({mssg:"Login SUccessful",token:token})

            }
            if(err){
                console.log(err)
            }
            
         })

    }else{
        res.send("User Doest not exist please signup");
    }
    }
    catch(err){
     console.log(err);
     res.send("something went wrong!")
    }
})

app.use(Authorization)
app.use("/bug",BugRoute)

app.listen(8080,async()=>{
    try{
        await connection;
        console.log("connected to database")
    }
    catch(err){
        console.log(err)
    }
    console.log("Listening in port 8080")
})