const mongoose = require("mongoose")

const productFeed = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Feedback:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("ProductFeedback",productFeed);