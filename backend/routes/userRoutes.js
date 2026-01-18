const express = require("express");
const router = express.Router();
const db = require("../db");

// =======================
// User Registration API
// =======================
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Registration failed" });
    }
    res.json({ message: "User registered successfully" });
  });
});

// =======================
// User Login API
// =======================
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Login failed" });
    }

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

module.exports = router;

