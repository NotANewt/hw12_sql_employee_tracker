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
