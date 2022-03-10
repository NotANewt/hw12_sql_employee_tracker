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

function sqlGetAllRoleTitles(sqldb) {
  const query = `SELECT title FROM role`;
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

function sqlGetRoleIdFromRoleTitle(sqldb, newEmployeeRole) {
  const query = `SELECT id FROM role WHERE title = '${newEmployeeRole}'`;
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

// modules to export
module.exports = { Role, sqlRequestAllRoles, sqlAddRole, sqlGetAllRoleTitles, sqlGetRoleIdFromRoleTitle };
