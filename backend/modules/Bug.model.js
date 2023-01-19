const mongoose=require('mongoose');

const  BugSchmea=mongoose.Schema({
    severity:String,
    title:String,
    userId:String
})

const BugModel=mongoose.model("Bug",BugSchmea);

module.exports={BugModel}