// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_tracker_db database.`)
);

/*
Department class
    * properties: id, name
*/

class Department {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }
}

function sqlViewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
  });
}

// module to export
module.exports = { Department, sqlViewAllDepartments };
