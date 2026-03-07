const express = require("express");
const router = express.Router();
const db = require("../db");
const transporter = require("../mailer");


// ======================================================
// USER REGISTRATION
// ======================================================

router.post("/register",(req,res)=>{

const {name,email,password,role}=req.body;

if(!name || !email || !password || !role){
return res.status(400).json({message:"All fields required"});
}

const sql="SELECT * FROM users WHERE email=? AND role=?";

db.query(sql,[email,role],(err,results)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Database error"});
}

if(results.length>0){
return res.status(400).json({
message:"Account already exists for this role"
});
}

const insertSql=
"INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)";

db.query(insertSql,[name,email,password,role],(err)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Registration failed"});
}

res.json({message:"User registered successfully"});

});

});

});


// ======================================================
// PASSWORD LOGIN
// ======================================================

router.post("/login",(req,res)=>{

const {email,password,role}=req.body;

const sql="SELECT * FROM users WHERE email=? AND password=? AND role=?";

db.query(sql,[email,password,role],(err,results)=>{

if(err){
return res.status(500).json({message:"Login failed"});
}

if(results.length===0){
return res.status(401).json({
message:"Invalid email password or role"
});
}

const user=results[0];

checkProfile(user,res);

});

});


// ======================================================
// SEND OTP
// ======================================================

router.post("/send-otp",(req,res)=>{

const {email,role}=req.body;

if(!email || !role){
return res.status(400).json({message:"Email and role required"});
}

const otp=Math.floor(100000+Math.random()*900000);

if(!global.otpStore){
global.otpStore={};
}

const key=email+"_"+role;

global.otpStore[key]={
otp:otp,
expires:Date.now()+5*60*1000
};

console.log("OTP for",email,"role",role,"=",otp);

const mailOptions={
from:"kishanmitra315@gmail.com",
to:email,
subject:"KisanMitra OTP",
text:`Your OTP is ${otp}`
};

transporter.sendMail(mailOptions,(error)=>{

if(error){
console.log(error);
return res.status(500).json({message:"OTP send failed"});
}

res.json({message:"OTP sent successfully"});

});

});


// ======================================================
// VERIFY OTP
// ======================================================

router.post("/verify-otp",(req,res)=>{

const {email,otp,role}=req.body;

const key=email+"_"+role;

const storedOtp=global.otpStore[key];

if(!storedOtp){
return res.status(400).json({message:"OTP not found"});
}

if(Date.now()>storedOtp.expires){
delete global.otpStore[key];
return res.status(401).json({message:"OTP expired"});
}

if(storedOtp.otp!=otp){
return res.status(401).json({message:"Invalid OTP"});
}

delete global.otpStore[key];

const sql="SELECT * FROM users WHERE email=? AND role=?";

db.query(sql,[email,role],(err,results)=>{

if(err){
return res.status(500).json({message:"Login failed"});
}

if(results.length===0){
return res.status(404).json({message:"User not found"});
}

const user=results[0];

checkProfile(user,res);

});

});


// ======================================================
// CHECK PROFILE FUNCTION
// ======================================================

function checkProfile(user,res){

const role=user.role.toLowerCase();

let profileSql=null;

if(role==="farmer"){
profileSql="SELECT * FROM farmer_profiles WHERE user_id=?";
}

else if(role==="expert"){
profileSql="SELECT * FROM expert_profiles WHERE user_id=?";
}

if(!profileSql){

return res.json({
message:"Login successful",
user:{
id:user.id,
name:user.name,
role:user.role
},
profileExists:true
});

}

db.query(profileSql,[user.id],(err,profileResults)=>{

if(err){
return res.status(500).json({message:"Profile check failed"});
}

const profileExists=profileResults && profileResults.length>0;

res.json({
message:"Login successful",
user:{
id:user.id,
name:user.name,
role:user.role
},
profileExists
});

});

}


// ======================================================
// FARMER PROFILE SAVE
// ======================================================

router.post("/farmer-profile",(req,res)=>{

const {user_id,crops,land_area,soil_type,location,irrigation_type}=req.body;

const sql=`
INSERT INTO farmer_profiles
(user_id,crops,land_area,soil_type,location,irrigation_type)
VALUES(?,?,?,?,?,?)
`;

db.query(sql,[user_id,crops,land_area,soil_type,location,irrigation_type],
(err)=>{

if(err){
return res.status(500).json({message:"Failed to save profile"});
}

res.json({message:"Farmer profile saved successfully"});

});

});


// ======================================================
// GET FARMER PROFILE
// ======================================================

router.get("/farmer-profile/:user_id",(req,res)=>{

const user_id=req.params.user_id;

const sql="SELECT * FROM farmer_profiles WHERE user_id=?";

db.query(sql,[user_id],(err,results)=>{

if(err){
return res.status(500).json({message:"Database error"});
}

if(results.length===0){
return res.json({exists:false});
}

res.json({
exists:true,
...results[0]
});

});

});


// ======================================================
// EXPERT PROFILE SAVE
// ======================================================

router.post("/expert-profile",(req,res)=>{

const {user_id,specialization,experience,qualification,location,phone}=req.body;

const sql=`
INSERT INTO expert_profiles
(user_id,specialization,experience,qualification,location,phone)
VALUES(?,?,?,?,?,?)
`;

db.query(sql,
[user_id,specialization,experience,qualification,location,phone],
(err)=>{

if(err){
return res.status(500).json({message:"Failed to save expert profile"});
}

res.json({message:"Expert profile saved successfully"});

});

});


// ======================================================
// GET EXPERT PROFILE
// ======================================================

router.get("/expert-profile/:user_id",(req,res)=>{

const user_id=req.params.user_id;

const sql="SELECT * FROM expert_profiles WHERE user_id=?";

db.query(sql,[user_id],(err,results)=>{

if(err){
return res.status(500).json({message:"Database error"});
}

if(results.length===0){
return res.json({exists:false});
}

res.json({
exists:true,
...results[0]
});

});

});


module.exports=router;