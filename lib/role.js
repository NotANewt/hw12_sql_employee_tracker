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
  return new Promise((resolve, reject) => {
    sqldb.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function sqlAddRole(sqldb, newRoleTitle, newRoleSalary, newRoleDepartmentId) {
  const query = `INSERT INTO role (title, salary, department_id)
VALUES
("${newRoleTitle}", "${newRoleSalary}", "${newRoleDepartmentId}")`;
  return new Promise((resolve, reject) => {
    sqldb.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// INSERT INTO role (title, salary, department_id)
// VALUES
// -- get this from user input
// -- department_id needs to come from department.name
// ("role title", salary, department_id);

// modules to export
module.exports = { Role, sqlRequestAllRoles, sqlAddRole };
