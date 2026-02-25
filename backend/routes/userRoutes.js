const express = require("express");
const router = express.Router();
const db = require("../db");
const transporter = require("../mailer");

// =======================
// User Registration API
// =======================
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkEmailSql = "SELECT * FROM users WHERE email = ?";

  db.query(checkEmailSql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const insertSql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(insertSql, [name, email, password, role], (err) => {
      if (err) return res.status(500).json({ message: "Registration failed" });

      res.json({ message: "User registered successfully" });
    });
  });
});

// =======================
// User Login API
// =======================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Login failed" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  });
});

// =======================
// Send OTP
// =======================
router.post("/send-otp", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const checkUserSql = "SELECT * FROM users WHERE email = ?";

  db.query(checkUserSql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    global.otpStore[email] = otp;

    const mailOptions = {
      from: "kishanmitra315@gmail.com",
      to: email,
      subject: "KisanMitra OTP Login",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("OTP sent:", otp);
      res.json({ message: "OTP sent to your email" });
    } catch (error) {
      console.error("Mail error:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  });
});

// =======================
// Verify OTP
// =======================
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (global.otpStore[email] === otp) {
    delete global.otpStore[email];

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {
      if (err || results.length === 0) {
        return res.status(500).json({ message: "Login failed" });
      }

      const user = results[0];

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        }
      });
    });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

// =======================
// Save Farmer Profile
// =======================
router.post("/farmer-profile", (req, res) => {
  const { user_id, crops, land_area, soil_type, location, irrigation_type } = req.body;

  if (!user_id || !crops || !land_area || !soil_type || !location) {
    return res.status(400).json({ message: "All fields required" });
  }

  const checkSql = "SELECT * FROM farmer_profiles WHERE user_id = ?";

  db.query(checkSql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const insertSql = `
      INSERT INTO farmer_profiles 
      (user_id, crops, land_area, soil_type, location, irrigation_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [user_id, crops, land_area, soil_type, location, irrigation_type],
      (err) => {
        if (err) return res.status(500).json({ message: "Failed to save profile" });

        res.json({ message: "Farmer profile saved successfully" });
      }
    );
  });
});

// =======================
// Check Farmer Profile Exists
// =======================
router.get("/farmer-profile/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const sql = "SELECT * FROM farmer_profiles WHERE user_id = ?";

  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  });
});

module.exports = router;