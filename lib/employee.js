/*
Employee class
    * properties: id, title, salary, department_id
*/
class Employee {
  constructor({ id, first_name, last_name, role_id, manager_id }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
  }
}

/*
 sqlRequestAllEmployees()
  request a table of all employees
    * query the database to select employee.id, employee.first_name, and employee.last_name, role.title, role.salary, 
      department.name, and the manager name from concating manager.first_name and manager.last_name from employee table
    * join with the role table at employee.role_id
    * join with the department table at role.department_id
    * join the employee as manager on employee.manager_id
    * order table by employee.id
    * return results or an error
*/
function sqlRequestAllEmployees(sqldb) {
  const query = `SELECT 
  employee.id, employee.first_name, employee.last_name, 
  role.title AS job_title, role.salary, 
  department.name AS department,
  CONCAT (manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
ORDER BY employee.id`;
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
 sqlGetAllEmployeeNames()
  get a list of all employee names
    * query the database to select the concatination of the first and last names of employees from the employee table
    * return results or an error
*/
function sqlGetAllEmployeeNames(sqldb) {
  const query = `SELECT CONCAT (first_name, " ", last_name) FROM employee`;
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
 sqlGetEmployeeIdFromEmployeeName()
  get an employee id from an employee's first and last names
    * query the database to select id from the employee table where the first and last names are supplied values
    * return results or an error
*/
function sqlGetEmployeeIdFromEmployeeName(sqldb, firstName, lastName) {
  const query = `SELECT id FROM employee WHERE first_name = '${firstName}' and last_name = '${lastName}'`;
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
 sqlAddEmployee()
  add an employee to the employee table
    * if the newEmployeeManagerId is NULL
      *  query the database to insert into the employee table without adding a manager_id
      * return results or an error
    * if the newEmployeeManagerId is not NULL
      * query the database to insert in to the employee table including a manager_id
      * return results or an error
*/
function sqlAddEmployee(sqldb, newFirstName, newLastName, newEmployeeRoleId, newEmployeeManagerId) {
  if (newEmployeeManagerId === "NULL") {
    const query = `INSERT INTO employee (first_name, last_name, role_id)
    VALUES
    ("${newFirstName}", "${newLastName}", "${newEmployeeRoleId}")`;
    return new Promise((resolve, reject) => {
      sqldb.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("${newFirstName}", "${newLastName}", "${newEmployeeRoleId}", "${newEmployeeManagerId}")`;
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
}

/*
 sqlUpdateEmployeeRole()
  update the role of an employee in the employee table
    * query the database to update the employee's role_id where the employee id is a supplied value
    * return results or an error
*/
function sqlUpdateEmployeeRole(sqldb, idOfUpdatedEmployee, updatedRoleIdForEmployee) {
  const query = `UPDATE employee
  SET role_id = '${updatedRoleIdForEmployee}'
  WHERE id = '${idOfUpdatedEmployee}'`;
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
 sqlUpdateEmployeeManager()
  update the manager of an employee in the employee table
    * if the idOfUpdatedEmployeesManager is NULL:
      * query the database to update the employee and set manager_id to NULL where the employee id is a supplied value
      * return results or an error
    * if the idOfUpdatedEmployeesManager is not NULL:
      * query the database to update the employee's manager_id where the employee id is a supplied value
      * return results or an error
*/
function sqlUpdateEmployeeManager(sqldb, idOfUpdatedEmployee, idOfUpdatedEmployeesManager) {
  if (idOfUpdatedEmployeesManager === "NULL") {
    const query = `UPDATE employee
  SET manager_id = ${idOfUpdatedEmployeesManager}
  WHERE id = '${idOfUpdatedEmployee}'`;
    return new Promise((resolve, reject) => {
      sqldb.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    const query = `UPDATE employee
  SET manager_id = '${idOfUpdatedEmployeesManager}'
  WHERE id = '${idOfUpdatedEmployee}'`;
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
}

/*
 sqlViewEmployeesByManager()
  select all first and last names of employees that have a specific manager
    * query the database to select the first_name and last_name from the employee table where the manager_id is a supplied value
    * return results or an error
*/
function sqlViewEmployeesByManager(sqldb, idOfManager) {
  const query = `SELECT first_name, last_name FROM employee WHERE manager_id = ${idOfManager}`;
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
 sqlViewEmployeesByDepartment()
  select all first and last names of employees that are in a specific department
    * query the database to select the first_name and last_name from the employee table
    * join with the role table on employee.role_id
    * join with department table on role.department_id
    * where the department_id is a supplied value
    * return results or an error
*/
function sqlViewEmployeesByDepartment(sqldb, idOfDepartment) {
  const query = `SELECT 
  employee.first_name, employee.last_name 
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

/*
 sqlDeleteEmployee()
  delete an employee from the employee table
    * query the database to delete a row from the employee table where the id is a supplied value
    * return results or an error
*/
function sqlDeleteEmployee(sqldb, idOfEmployoee) {
  const query = `DELETE FROM employee WHERE id = '${idOfEmployoee}'`;
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
module.exports = { Employee, sqlRequestAllEmployees, sqlGetAllEmployeeNames, sqlGetEmployeeIdFromEmployeeName, sqlAddEmployee, sqlUpdateEmployeeRole, sqlUpdateEmployeeManager, sqlViewEmployeesByManager, sqlViewEmployeesByDepartment, sqlDeleteEmployee };
