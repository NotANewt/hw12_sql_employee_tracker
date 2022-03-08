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

function sqlRequestAllDepartments(sqldb) {
  const query = "SELECT * FROM department";

  sqldb.query(query, function (err, results) {
    console.log(results);
  });
}

// module to export
module.exports = { Department, sqlRequestAllDepartments };
