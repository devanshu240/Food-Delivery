const jwt = require("jsonwebtoken");
const secretKey = "abcderfghijklmnopqrestuvwxyz";
function Authorization(req,res,next){
    let token;
    if(req.body.role==="admin"){
        token=req.cookies.admin_access_token;
    }
    else if(req.body.role==="user"){
        token=req.cookies.access_token;
    }
    if(!token){
        res.status(200).json({success:false, msg:"your are not authorized"});
    }
    else{
        jwt.verify(token,secretKey,(err,data)=>{
            if(err){
                res.status(200).json({success:false, msg:"your are not authorized"});
            }
            else{
                // res.status(200).json("verification ins completed");
                next();
            }
        })
    }
}

module.exports = Authorization;