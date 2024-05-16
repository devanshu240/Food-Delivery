const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    Name:{
        type:String,
    },
    Amount:{
        type:String
    },
    Qnty:{
        type:String
    },
    TableNo:{
        type:Number
    }
})

module.exports = mongoose.model("Orders",orderSchema);