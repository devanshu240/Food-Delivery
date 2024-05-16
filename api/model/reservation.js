const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    UserId:Object,
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Phone:{
        type:Number,
        require:true
    },
    Persons:{
        type:Number,
        require:true,
    },
    StartTime:{
        type:Number,
        require:true
    },
    EndTime:{
        type:Number,
        require:true
    },
    TableNo:{
        type:Number
    },
    Status:{
        type:String,
        default:"Pending"
    }
})

module.exports = mongoose.model("Reservation",reservationSchema);