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

/*
 sqlRequestAllDepartments()
  request a table of all departments
    * query the database to select all from department
    * return results or an error
*/
function sqlRequestAllDepartments(sqldb) {
  const query = "SELECT * FROM department";
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
 sqlAddDepartment()
  add a department to the department table
    * query the database to insert into the department table
    * return results or an error
*/
function sqlAddDepartment(sqldb, newDepartmentName) {
  const query = `INSERT INTO department (name)
VALUES
("${newDepartmentName}")`;
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
 sqlGetAllDepartmentNames()
  get a list of all department names
    * query the database to select all name from the department table
    * return results or an error
*/
function sqlGetAllDepartmentNames(sqldb) {
  const query = `SELECT name FROM department`;
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
 sqlGetDepartmentIdFromDepartmentName()
  get a department id from a department name from the department table
    * query the database to select id from the department table where the name is a supplied value
    * return results or an error
*/
function sqlGetDepartmentIdFromDepartmentName(sqldb, departmentName) {
  const query = `SELECT id FROM department WHERE name = '${departmentName}'`;
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
 sqlDeleteDepartment()
  delete a department from the department table
    * query the database to delete a row from the department table where the id is a supplied value
    * return results or an error
*/
function sqlDeleteDepartment(sqldb, idOfDepartment) {
  const query = `DELETE FROM department WHERE id = '${idOfDepartment}'`;
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
 sqlViewDepartmentBudget()
  view the salaries of all employees in a certain department
    * query the database to select the salaries where the department_id is a supplied value
    * return results or an error
*/
function sqlViewDepartmentBudget(sqldb, idOfDepartment) {
  const query = `SELECT role.salary
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  WHERE department_id = ${idOfDepartment}`;
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

// module to export
module.exports = { Department, sqlRequestAllDepartments, sqlAddDepartment, sqlGetAllDepartmentNames, sqlGetDepartmentIdFromDepartmentName, sqlDeleteDepartment, sqlViewDepartmentBudget };
