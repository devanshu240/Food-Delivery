const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    order:{
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model("user",userSchema);