const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set connection variables
let config = {
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Connect to database
const sqldb = mysql.createConnection(config, console.log(`Connected to the employee_tracker_db database.`));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { sqldb };
