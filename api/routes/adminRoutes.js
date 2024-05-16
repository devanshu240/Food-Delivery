const express = require("express");
const bycrpt = require("bcrypt");
const Product = require("../model/product");
const Reservation = require("../model/reservation");
const Orders = require("../model/orders");
const jwt = require("jsonwebtoken");
const secretKey = "abcderfghijklmnopqrestuvwxyz";
const Admin = require("../model/admin")
const {SendConfirmationMessage} = require("../EmailReleatedWork");
const Authorization = require("../Authorization");
const multer = require("multer")
const path = require("path");
const fs = require("fs")
const Router = express.Router();

// login
Router.post("/login",async(req,res)=>{
    console.log("hello");
    try{
        console.log(req.body);
        const admin = await Admin.findOne({ Email: req.body.email });
        admin===null && res.status(200).json({success:false, msg:"No admin with email address"});

        const validPassword = await bycrpt.compare(req.body.password, admin.Password);
        validPassword===false && res.status(200).json({success:false, msg:"Wrong Password"});

        jwt.sign({ admin }, secretKey, { expiresIn: '300s' }, (err, token) => {
            if (err) {
                console.log(err);
                res.status(200).json({success:false, msg:"Their is error in token"});
            }
            else {
                res.cookie("admin_access_token", token, {
                    httpOnly: true,
                }).status(200).json({success:true, msg:"You logged in", admin});
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json("internal server error");
    }
})

// signUp Admin
Router.post("/signup",async(req,res)=>{
    try {
        console.log(req.body);
        const salt = await bycrpt.genSalt(10);
        const hashPassword = await bycrpt.hash(req.body.password, salt);
        const newAdmin = new Admin(
            {
                Name: req.body.name,
                Email: req.body.email,
                Password: hashPassword,
                TableCount:20
            }
        );
        const savedAdmin = await newAdmin.save();
        console.log(savedAdmin);
        res.status(200).json(savedAdmin);
    } catch (e) {
        res.status(500).json(e);
    }
});
// logout
Router.post("/logout", Authorization, async (req, res) => {
    res.clearCookie('admin_access_token').status(200).json("logout successfully");
})

// adding product
let image=null;
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"upload");
    },
    filename:function(req,file,cb){
        const suffix = Date.now() + Math.random(Math.random()*1e9);
        image=suffix + file.originalname;
        cb(null,suffix + file.originalname);
    }
})
const upload = multer({storage:storage});
Router.post("/product/add",Authorization,upload.single("Image"),async(req,res)=>{
    console.log(req.body);
    try{
        const newProduct = new Product({
            name:req.body.Name,
            price:req.body.Price,
            type:req.body.Type,
            desc:req.body.Description,
            Img:image
        });
        const savedNewProduct = await newProduct.save();
        res.status(200).json(savedNewProduct);
    }catch(e){
        res.status(500).json(e);
    }
});

// getting list of products
Router.get("/product/list", async(req,res)=>{
    try{
        const result = await Product.find({});
        res.status(200).json(result);
    }
    catch(e){
        res.status(500).json(e);
    }
});

// deleting product
Router.post("/product/:id",async(req,res)=>{
    console.log(req.params.id);
    try{
        const imageName = req.body.name;
        const imgPath = path.join(__dirname,"../upload",imageName);

        const product = await Product.findById(req.params.id);
        !product && res.status(404).json("not found");
        
        await fs.unlinkSync(imgPath);

        await product.deleteOne();
        res.status(200).json("product is deleted successfully");
    }
    catch(e){
        res.status(500).json(e);
    }
})

// updating product
Router.post("/product/update/:id",async(req,res)=>{
    console.log(req.params.id);
    try{
        const product = await Product.findById(req.params.id);
        !product && res.status(400).json("not found");

        const data={
            name:req.body.Name,
            price:req.body.Price,
            type:req.body.Type,
            desc:req.body.Description,
        }
        await product.updateOne(data);
        res.status(200).json("product is updated successfully");
    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }
})

// getting table booking
Router.get("/table/booking",async(req,res)=>{
    try{
        const result = await Reservation.find({});
        // console.log(result);
        res.status(200).json(result);
    }
    catch(e){
        console.log(e);
    }
})

// getting order booking
Router.get("/order/booking",async(req,res)=>{
    try{
        const result = await Orders.find({});
        res.status(200).json(result);
    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }
})

// Table Booking is Accepted
Router.post("/accept/table/booking",async(req,res)=>{
    try{
        const Email = req.body.Email;
        console.log(Email);
        const tableNo = 1;
        const msg="Your Table is confirmed from admin.";
        await SendConfirmationMessage(Email,tableNo,msg);// this will three argument one is Email, tableNo, TokenNo (TokenNo is to verify the user when it comes to reasturent)
        const reserve = await Reservation.findOne({Email:req.body.Email});
        reserve.Status="Resolve";
        await reserve.updateOne(reserve);
        res.status(200).json("verification is send to the user");
    }
    catch(e){
        console.log(e);
        res.status(500).json("there is some error in accepting table booking");
    }
})

// Reject or Delete table booking
Router.delete("/reject/table/booking/:id",async(req,res)=>{
    const booking=await Reservation.findById(req.params.id);
    !booking && res.status(400).send("there is no booking");
    await booking.deleteOne();
    res.status(200).send("Booking is rejected by the Owner");
})

// deleting order
Router.delete("/delete/order/:id",async(req,res)=>{
    const order = await Orders.findById(req.params.id);
    if(order===null){
        res.status(200).json({success:false,msg:"This order is not in database"});
    }
    else{
        await order.deleteOne();
        res.status(200).json({success:true,msg:"Order is deleted from database"})
    }
})

// Leave table
Router.post("/leave/booked/table/:id",Authorization,async(req,res)=>{
    const booked = await Reservation.findById(req.params.id);
    !booked && res.status(400).send("there is no booking");
    await booking.deleteOne();
    res.status(200).json("");
})

module.exports = Router;