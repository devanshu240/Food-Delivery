const Router = require("express").Router();
const { model } = require("mongoose");
const User = require("../model/user");
const Reservation = require("../model/reservation");
const ProductFeedback = require("../model/productFeed");
const Product = require("../model/product");
const Order = require("../model/orders");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "abcderfghijklmnopqrestuvwxyz";
const Authorization = require("../Authorization");
const validateReservation = require("../validateReservation");
const { SendConfirmationMessage, VerifyMailByOTP } = require("../EmailReleatedWork");
const Razorpay = require("razorpay");
const crypto = require("crypto");


const razorpay = new Razorpay({
    key_id: "rzp_test_Ded3bdocbpducP",
    key_secret: "CZFVd0ldCFTmCybO11RwIlyL",
});

// Login
Router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        user===null && res.status(200).json({success:false, msg:"Not any user with this email address"});

        const validPassword = await bycrpt.compare(req.body.password, user.password);
        validPassword===false && res.status(200).json({success:false, msg:"Wrong Password"});

        jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
            if (err) {
                res.status(500).json("their is error in JWT");
            }
            else {
                res.cookie("access_token", token, {
                    httpOnly: true,
                }).status(200).json({success:true,msg:"you logged in",user});
            }
        })
    }
    catch (e) {
        res.status(500).json(e);
    }
});

// Logout
Router.post("/logout", Authorization, async (req, res) => {
    res.clearCookie('access_token').status(200).json("logout successfully");
})

// SignUp
Router.post("/signup", async (req, res) => {
    try {
        console.log(req.body);
        const salt = await bycrpt.genSalt(10);
        const hashPassword = await bycrpt.hash(req.body.password, salt);
        const newuser = new User(
            {
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            }
        );
        const savedUser = await newuser.save();
        console.log(savedUser);
        res.status(200).json(savedUser);
    } catch (e) {
        res.status(500).json(e);
    }
});

//  make Reservation
const convertToNumber = (time) => {
    let t = 0;
    for (let i = 0; i < time.length; i++) {
        if (time[i] !== ':') {
            t = t * 10 + Number(time[i]);
        }
    }
    return t;
}
Router.post("/create/reservation", async (req, res) => {
    try {
        const startTime = convertToNumber(req.body.startTime);
        const endTime = convertToNumber(req.body.endTime);
        const tableNo = await validateReservation(startTime, endTime);
        console.log(tableNo);
        if (tableNo == -1) {
            res.status(200).json({success:false,msg:"all tables is booked on time duration"});
        }
        const newReservation = new Reservation({
            UserId:req.body.userId,
            Name: req.body.name,
            Email: req.body.email,
            Phone: req.body.phone,
            Persons: req.body.personCount,
            StartTime: startTime,
            EndTime: endTime,
            TableNo: tableNo,
        });
        const savedReservation = await newReservation.save();
        const msg="Table is available for this duration of time. Now admin will verify the mail. if Yes then get confirmation other wise no";
        await SendConfirmationMessage(req.body.email, tableNo,msg);
        res.status(200).json({success:true,msg:"Table is available"});
    }
    catch (e) {
        console.log(e);
        res.status(200).json({success:false, msg:"Interal server error"});
    }
})

// add product Feedback
Router.post("/add/product/feedback/:id", async (req, res) => {
    console.log(req.body);
    try {
        // const productId=req.params.id;
        const feed = new ProductFeedback({
            Name: req.body.name,
            Feedback: req.body.feedback
        });
        const savedFeed = await feed.save();
        const product = await Product.findById(req.params.id);
        product.feed.push(savedFeed._id);
        await product.updateOne(product);
        res.status(200).json(savedFeed);
    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
})

// get product Feedback
Router.post("/add/product/Feedback/:id/list", async (req, res) => {
    const result = await ProductFeedback.findById(req.params.id);
    !result && res.status(400).json("not found");
    // console.log(result);
    res.status(200).json(result);
})

// Email Verification
Router.post("/email/verification",Authorization,async (req, res) => {
    try {
        const Email = req.body.email;
        const OTP = await VerifyMailByOTP(Email);
        console.log(OTP);
        if (OTP == -1) {
            res.status(200).json({success:false, msg:"Table is already booked on this time period"});
        }
        else {
            res.status(200).json({sucess:true,msg:"Table is free for this time period", OTP: OTP });
        }
    } catch (e) {
        res.status(500).json("Internal Server Error");
    }
});

// backend
Router.post("/payment/orders", async (req, res) => {

    try {
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };
        const response = await razorpay.orders.create(options);

        const data = {
            _id: response.id,
            amount: response.amount,
            currency: response.currency,
        }

        res.status(200).json({ success: true, data })

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error!" });
        console.log("error in orders ");
        console.log(error.message)
    }
});

Router.post("/payment/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", "CZFVd0ldCFTmCybO11RwIlyL")
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.json({ success: true, message: "Payment verified successfully" });
        } else {
            return res.json({ success: false, message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.log("message in verify" + error.message);
        res.json({ success: false, message: "Internal Server Error!" });
    }
});

Router.post("/payment/saveorder", async (req, res) => {
    console.log(req.body);
    try {
        const reservation = await Reservation.findOne({ UserId: req.body.user_id, Status:"Resolve" });
        const tableNo = reservation.TableNo;
        const newOrder = new Order({
            Name: req.body.product.name,
            Amount: req.body.product.price,
            Qnty: req.body.product.qnty,
            TableNo: tableNo
        });
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch (e) {
        console.log(e);
    }
});

Router.post("/verify/reservation",Authorization,async(req,res)=>{
    try{
        const reservation = await Reservation.findOne({UserId:req.body.userId, Status:"Resolve"});
        if(reservation===null){
            res.status(200).json({success:false ,msg:"your reservation is not accepted by admin"});
        }
        else{
            res.status(200).json("User is verified");
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal server error");
    }
})

module.exports = Router;