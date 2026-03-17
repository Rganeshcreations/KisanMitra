const express = require("express");
const router = express.Router();
const db = require("../db");


// ===============================
// ADMIN DASHBOARD STATS
// ===============================

router.get("/stats",(req,res)=>{

const stats={};

db.query(
"SELECT COUNT(*) AS totalFarmers FROM users WHERE role='farmer'",
(err,farmers)=>{

if(err) return res.status(500).json({message:"Database error"});

stats.totalFarmers=farmers[0].totalFarmers;


db.query(
"SELECT COUNT(*) AS totalExperts FROM users WHERE role='expert'",
(err,experts)=>{

if(err) return res.status(500).json({message:"Database error"});

stats.totalExperts=experts[0].totalExperts;


db.query(
"SELECT COUNT(*) AS totalPublic FROM users WHERE role='public'",
(err,publicUsers)=>{

if(err) return res.status(500).json({message:"Database error"});

stats.totalPublic=publicUsers[0].totalPublic;


db.query(
"SELECT COUNT(*) AS totalCrops FROM crops",
(err,crops)=>{

if(err) return res.status(500).json({message:"Database error"});

stats.totalCrops=crops[0].totalCrops;

res.json(stats);

});

});

});

});

});


// ===============================
// GET FARMERS
// ===============================

router.get("/farmers",(req,res)=>{

const sql="SELECT id,name,email FROM users WHERE role='farmer'";

db.query(sql,(err,result)=>{

if(err) return res.status(500).json({message:"Database error"});

res.json(result);

});

});


// ===============================
// GET EXPERTS
// ===============================

router.get("/experts",(req,res)=>{

const sql="SELECT id,name,email FROM users WHERE role='expert'";

db.query(sql,(err,result)=>{

if(err) return res.status(500).json({message:"Database error"});

res.json(result);

});

});


// ===============================
// GET PUBLIC USERS
// ===============================

router.get("/public-users",(req,res)=>{

const sql="SELECT id,name,email FROM users WHERE role='public'";

db.query(sql,(err,result)=>{

if(err) return res.status(500).json({message:"Database error"});

res.json(result);

});

});


// ===============================
// GET ALL CROPS
// ===============================

router.get("/crops",(req,res)=>{

const sql=`
SELECT 
crops.id,
users.name AS farmer_name,
crops.crop_name,
crops.seeding_date,
crops.land_size,
crops.quantity_produced,
crops.selling_price
FROM crops
JOIN users ON crops.user_id = users.id
`;

db.query(sql,(err,result)=>{

if(err) return res.status(500).json({message:"Database error"});

res.json(result);

});

});


// ===============================
// FARMER FULL DETAILS
// ===============================

router.get("/farmer-details/:id",(req,res)=>{

const farmerId=req.params.id;
const data={};


// Farmer basic info

db.query(
"SELECT id,name,email FROM users WHERE id=?",
[farmerId],
(err,user)=>{

if(err) return res.status(500).json({message:"Database error"});

if(user.length===0){
return res.status(404).json({message:"Farmer not found"});
}

data.farmer=user[0];


// Farmer profile

db.query(
"SELECT * FROM farmer_profiles WHERE user_id=?",
[farmerId],
(err,profile)=>{

if(err) return res.status(500).json({message:"Database error"});

data.profile=profile.length?profile[0]:null;


// Farmer crops

db.query(
"SELECT * FROM crops WHERE user_id=?",
[farmerId],
(err,crops)=>{

if(err) return res.status(500).json({message:"Database error"});

data.crops=crops;


// Farmer expenditures

db.query(
`SELECT expenditures.*, crops.crop_name
FROM expenditures
JOIN crops ON expenditures.crop_id=crops.id
WHERE crops.user_id=?`,
[farmerId],
(err,expenses)=>{

if(err) return res.status(500).json({message:"Database error"});

data.expenditures=expenses;

res.json(data);

});

});

});

});

});


module.exports = router;