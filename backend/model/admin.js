const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true,
    },
    Password:{
        type:String,
        require:true,
    },
    TableCount:{
        type:Number,
        require:true
    }
});
module.exports = mongoose.model("Admin",admin);