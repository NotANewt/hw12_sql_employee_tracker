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

// module to export
module.exports = Role;
