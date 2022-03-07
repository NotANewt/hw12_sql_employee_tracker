/*
Employee class
    * properties: id, title, salary, department_id
    * methods: 
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

// module to export
module.exports = Employee;
