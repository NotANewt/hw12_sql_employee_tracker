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

// module to export
module.exports = { Department, sqlRequestAllDepartments };
