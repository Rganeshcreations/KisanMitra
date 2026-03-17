// ==============================
// IMPORT MYSQL
// ==============================

const mysql = require("mysql2");
require("dotenv").config();


// ==============================
// CREATE CONNECTION POOL
// ==============================

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Ganesh@123",
  database: process.env.DB_NAME || "kisanmitra_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// ==============================
// TEST CONNECTION
// ==============================

db.getConnection((err, connection) => {

  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    return;
  }

  console.log("✅ MySQL Connected Successfully");

  connection.release();

});


// ==============================
// EXPORT DATABASE
// ==============================

module.exports = db;