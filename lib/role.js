/*
Role class
    * properties: id, title, salary, department_id
    * methods: 
*/

class Role {
  constructor({ id, title, salary, department_id }) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }
}

function sqlRequestAllRoles(sqldb) {
  const query = "SELECT * FROM role";

  sqldb.query(query, function (err, results) {
    console.log(results);
  });
}

// modules to export
module.exports = { Role, sqlRequestAllRoles };
