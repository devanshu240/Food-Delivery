const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    Img:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    feed:{
        type:Array,
        default:[]
    }
});
module.exports = mongoose.model("Product",productSchema);