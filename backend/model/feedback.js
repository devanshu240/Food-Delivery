const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Feedback:{
        type:String,
        require:true,
    },
    Experience:{
        type:String,
        require:true
    }
});

module.exports =  mongoose.model("Feedback",feedbackSchema);