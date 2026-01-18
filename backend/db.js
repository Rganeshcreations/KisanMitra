const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // your MySQL username
  password: "Ganesh@123", // your MySQL password
  database: "kisanmitra_db"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed ❌");
    console.error(err);
  } else {
    console.log("MySQL connected successfully ✅");
  }
});

module.exports = db;
