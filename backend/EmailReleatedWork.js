const express = require("express");
const Router = express.Router();
const nodemailer = require("nodemailer");


function SendConfirmationMessage(Email, TableNo, msg) {
    return new Promise((resolve,reject)=>{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "devanshu1240.be21@chitkarauniversity.edu.in",
                pass: "hjxbwxwqpziudxbs"
            }
        });
        transporter.sendMail({
            form: "devanshu1240.be21@chitkarauniversity.edu.in",
            to: `${Email}`,
            subject: "Table Booking Confirmation",
            text: "this is under Alpha testing",
            html: `<h1>${msg}</h1> <h2>Your TableNo is ${TableNo}</h2/>`
        }, (err, info) => {
            if (err) {
                console.log("Error sending mail " + err);
                reject(err);
            } else {
                console.log("Email sent " + info);
                resolve(info);
            }
        })
    })
}

// Verify your Email
function generateOTP() {
    let length = 5;
    const chars = '123456789'; // Characters to use for OTP
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        otp += chars[randomIndex];
    }

    return otp;
}
function VerifyMailByOTP(Email) {
    return new Promise((resolve, reject) => {
        const OTP = generateOTP();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "devanshu1240.be21@chitkarauniversity.edu.in",
                pass: "hjxbwxwqpziudxbs"
            }
        });
        transporter.sendMail({
            form: "devanshu1240.be21@chitkarauniversity.edu.in",
            to: `${Email}`,
            subject: "OTP for Email Verfication",
            text: "this is under Alpha testing",
            html: `<h3>This OTP is valid for only 5 min</h3> <h3>OTP: ${OTP}</h3> <h4>Don't share your OTP to any one</h4/>`
        }, (err, info) => {
            if (err) {
                console.log("Error sending mail " + err);
                reject(err);
            } else {
                console.log("Email sent " + info);
                resolve(OTP);
            }
        })
    })
}

module.exports = { SendConfirmationMessage, VerifyMailByOTP };