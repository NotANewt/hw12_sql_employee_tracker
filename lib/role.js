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

/*
 sqlRequestAllRoles()
  request a table of all roles
    * query the database to select all from the role table
    * return results or an error
*/
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

/*
 sqlAddRole()
  add a role to the department table
    * query the database to insert into the role table
    * return results or an error
*/
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

/*
 sqlGetAllRoleTitles()
  get a list of all role titles
    * query the database to select all title from the role table
    * return results or an error
*/
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

/*
 sqlGetRoleIdFromRoleTitle()
  get a role id from a role title from the role table
    * query the database to select id from the role table where the title is a supplied value
    * return results or an error
*/
function sqlGetRoleIdFromRoleTitle(sqldb, roleTitle) {
  const query = `SELECT id FROM role WHERE title = '${roleTitle}'`;
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

/*
 sqlDeleteRole()
  delete a role from the role table
    * query the database to delete a row from the role table where the id is a supplied value
    * return results or an error
*/
function sqlDeleteRole(sqldb, idOfRole) {
  const query = `DELETE FROM role WHERE id = '${idOfRole}'`;
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
module.exports = { Role, sqlRequestAllRoles, sqlAddRole, sqlGetAllRoleTitles, sqlGetRoleIdFromRoleTitle, sqlDeleteRole };
