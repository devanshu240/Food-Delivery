const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const path = require("path");
const app = express();
require('dotenv').config();

const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");
const feedbackRoute = require("./routes/feedbackRoutes");

app.use(cors());
app.use(helmet()); // this will add more sequirty when someone hit the request on backend
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie_parser());
app.use("/api/upload",express.static("upload"));

// app.use((req, res, next) => { // this will print all incoming requests.
//     console.log(`Incoming ${req.method} request to ${req.url}`);
//     next(); // Call next() to pass control to the next middleware function
// });
const port = process.env.PORT || 8000;
mongoose.connect("mongodb://127.0.0.1:27017/").then(()=>{console.log("connected to mongoDB")}).catch((e)=>{console.log(e)});

app.use("/api/user",userRoute);
app.use("/api/admin",adminRoute);
app.use("/api/feedback",feedbackRoute);

app.listen(port,()=>{
    console.log("server is running on port no 8000");
});