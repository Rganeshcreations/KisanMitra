const express = require("express");
const cors = require("cors");
const db = require("./db");

// ✅ OTP temporary storage
global.otpStore = {};

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("KisanMitra backend is running");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
