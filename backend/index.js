const express = require("express");
const cors = require("cors");
const db = require("./db");

// ✅ OTP temporary storage
global.otpStore = {};

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");   // ✅ ADD THIS

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);   // ✅ ADD THIS

// test route
app.get("/", (req, res) => {
res.json({
status:"Server Running",
app:"KisanMitra",
version:"1.0"
});
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});