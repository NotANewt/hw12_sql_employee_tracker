const mysql = require("mysql2");
require("dotenv").config();

// set connection variables
let config = {
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Connect to database
const connection = mysql.createConnection(config, console.log(`Connected to the employee_tracker_db database.`));

module.exports = connection;
