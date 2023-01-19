const express=require('express');
const {BugModel}=require("../modules/Bug.model")
const BugRoute=express.Router();

BugRoute.get("/",async(req,res)=>{
    const userId=req.body.userId;
try{
const bug=await BugModel.find({userId});
res.send(bug)
}
catch(err){
    console.log(err);
    res.send("Something went wrong")
}
})

BugRoute.post("/addbug",async(req,res)=>{

    const data=req.body;
    console.log(req.body)
    try{
      const bug=await BugModel.create(data);
      res.send("Data posted succesfully")
    }
    catch(err){
        console.log("err");
        res.send("Something went wrong")
    }
})



module.exports={BugRoute}