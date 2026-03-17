// ==============================
// IMPORT MODULES
// ==============================

require("dotenv").config();

const express = require("express");
const cors = require("cors");


// ==============================
// IMPORT ROUTES
// ==============================

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");


// ==============================
// CREATE APP
// ==============================

const app = express();


// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());


// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {
  res.send("🚀 KisanMitra Backend Running");
});


// ==============================
// API ROUTES
// ==============================

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);


// ==============================
// GLOBAL ERROR HANDLER
// ==============================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    message: "Internal Server Error"
  });
});


// ==============================
// SERVER START
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 KisanMitra Server running on port ${PORT}`);
});