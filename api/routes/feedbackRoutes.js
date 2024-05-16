const express = require("express");
const Feedback = require("../model/feedback");
const Authorization = require("../Authorization");
const Router = express.Router();

// getting list of feedback from customers
Router.get("/list",async(req,res)=>{
    console.log("hit by feedback page");
    try{
        const result = await Feedback.find({});
        !result && res.status(404).json("data not found");
        res.status(200).json(result);
    }
    catch(e){
        res.status(500).json("internal server error");
    }
});

// adding feedback to data base
Router.post("/add",Authorization,async(req,res)=>{
    try{
        const feed = new Feedback({
            Name:req.body.Name,
            Feedback:req.body.Feedback,
            Experience:req.body.Experience
        });
        const feedSaved = await feed.save();
        res.status(200).json({feedSaved,success:true,msg:"data is stored successfully"});
    }catch(e){
        res.status(500).json({success:false,msg:"internal server error"});
    }
});

module.exports = Router;