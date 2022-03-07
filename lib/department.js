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
  sqldb.query("SELECT * FROM department", function (err, results) {
    return results;
  });
}

// module to export
module.exports = { Department, sqlRequestAllDepartments };
