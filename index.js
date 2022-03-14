const inquirer = require("inquirer");
const cTable = require("console.table");
const departmentClass = require("./lib/department.js");
const roleClass = require("./lib/role.js");
const employeeClass = require("./lib/employee.js");

let sqldb = require("./db.js");

let arrayOfDepartments = [];
let arrayOfRoles = [];
let arrayOfEmployees = [];
let arrayOfPossibleManagers = [];

/*
 bannerMain()
  prints out ASCII text banner in terminal
    * prints out "Employee Tracker" in terminal
    * calls runMainMenu function
*/
function bannerMain() {
  const banner = `
 _____                    _                           
|  ___|                  | |                          
| |__   _ __ ___   _ __  | |  ___   _   _   ___   ___ 
|  __| | '_   _ \\ | '_ \\ | | / _ \\ | | | | / _ \\ / _ \\
| |___ | | | | | || |_) || || (_) || |_| ||  __/|  __/
\\____/ |_| |_| |_|| .__/ |_| \\___/  \\__, | \\___| \\___|
                  | |                __/ |            
                  |_|               |___/             
 _____                     _                          
|_   _|                   | |                         
  | |   _ __   __ _   ___ | | __  ___  _ __           
  | |  | '__| / _  | / __|| |/ / / _ \\| '__|          
  | |  | |   | (_| || (__ |   < |  __/| |             
  \\_/  |_|    \\__,_| \\___||_|\\_\\ \\___||_|             
                                                       
                                                       
 `;

  console.log(banner);
  runMainMenu();
}

/*
 runMainMenu()
  prompts user with the main options
    * 
*/
function runMainMenu() {
  // Array with Main Menu prompt
  const mainMenuPrompt = [
    {
      name: "mainOptions",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Departments", "Add Department", "View All Roles", "Add Role", "View All Employees", "Add Employee", "Update Employee Role", "Update Employee Manager", "View Employees By Manager", "View Employees By Department", "Delete Department", "Delete Role", "Delete Employee", "View The Total Utilized Budget of a Department", "Quit"],
    },
  ];

  inquirer.prompt(mainMenuPrompt).then(function (answers) {
    let mainMenuPick = answers.mainOptions;

    if (mainMenuPick === "View All Employees") {
      viewAllEmployees();
    } else if (mainMenuPick === "Add Employee") {
      addEmployee();
    } else if (mainMenuPick === "Update Employee Role") {
      updateEmployeeRole();
    } else if (mainMenuPick === "View All Roles") {
      viewAllRoles();
    } else if (mainMenuPick === "Add Role") {
      addRole();
    } else if (mainMenuPick === "View All Departments") {
      viewAllDepartments();
    } else if (mainMenuPick === "Add Department") {
      addDepartment();
    } else if (mainMenuPick === "Update Employee Manager") {
      updateEmployeeManager();
    } else if (mainMenuPick === "View Employees By Manager") {
      viewEmployeesByManager();
    } else if (mainMenuPick === "View Employees By Department") {
      viewEmployeesByDepartment();
    } else if (mainMenuPick === "Delete Department") {
      deleteDepartment();
    } else if (mainMenuPick === "Delete Role") {
      deleteRole();
    } else if (mainMenuPick === "Delete Employee") {
      deleteEmployee();
    } else if (mainMenuPick === "View The Total Utilized Budget of a Department") {
      viewTotalUtilizedBudgetOfADepartment();
    } else {
      quitTracker();
    }
  });
}

/*
 viewAllDepartments()
  returns department table
    * 
*/
async function viewAllDepartments() {
  const result = await departmentClass.sqlRequestAllDepartments(sqldb);
  console.table(result);
  runMainMenu();
}

/*
 addDepartment()
  add new department to department table
    * 
*/
function addDepartment() {
  // Array with Add Department prompt

  const addDepartmentPrompt = [
    {
      name: "departmentName",
      type: "input",
      message: "Enter department name.",
      validate: function (input) {
        const valid = input !== "";
        return valid || "Please enter a department name";
      },
    },
  ];

  inquirer.prompt(addDepartmentPrompt).then(async function (answers) {
    const newDepartmentName = answers.departmentName;
    await departmentClass.sqlAddDepartment(sqldb, newDepartmentName);
    console.log(`Added new department: ${answers.departmentName}
    `);
    runMainMenu();
  });
}

/*
 viewAllRoles()
  returns roles table
    * 
*/
async function viewAllRoles() {
  const result = await roleClass.sqlRequestAllRoles(sqldb);
  console.table(result);
  runMainMenu();
}

/*
 addRole()
  add new role to role table
    * 
*/
async function addRole() {
  await updateDepartmentsArray();

  // Array with Add Role prompt
  const addRolePrompts = [
    {
      name: "roleTitle",
      type: "input",
      message: "Enter role name.",
      validate: function (input) {
        const valid = input !== "";
        return valid || "Please enter a department name";
      },
    },
    {
      name: "salary",
      type: "input",
      message: "Enter salary.",
      validate: function (input) {
        const valid = input !== "";
        return valid || "Please enter a salary";
      },
    },
    {
      name: "departmentSelected",
      type: "list",
      message: "What department does this role belong to?",
      choices: arrayOfDepartments,
    },
  ];

  inquirer.prompt(addRolePrompts).then(async function (answers) {
    const newRoleTitle = answers.roleTitle;
    const newRoleSalary = answers.salary;
    const departmentName = answers.departmentSelected;
    const roleDepartmentIdFromTable = await departmentClass.sqlGetDepartmentIdFromDepartmentName(sqldb, departmentName);
    const newRoleDepartmentId = roleDepartmentIdFromTable[0].id;

    await roleClass.sqlAddRole(sqldb, newRoleTitle, newRoleSalary, newRoleDepartmentId);
    console.log(`Added new role: ${newRoleTitle}
    `);
    runMainMenu();
  });
}

/*
 getAllDepartmentsInArray()
  select all department names and put them into an array
    * 
*/
async function updateDepartmentsArray() {
  let departmentNames = await departmentClass.sqlGetAllDepartmentNames(sqldb);

  arrayOfDepartments = [];

  departmentNames.forEach((departmentName) => {
    for (let key in departmentName) {
      arrayOfDepartments.push(departmentName[key]);
    }
  });

  return arrayOfDepartments;
}

/*
 viewAllEmployees()
  returns table with all employees
    * 
*/
async function viewAllEmployees() {
  const result = await employeeClass.sqlRequestAllEmployees(sqldb);
  console.table(result);
  runMainMenu();
}

/*
 addEmployee()
  add new employee to employee table
    * 
*/
async function addEmployee() {
  await updateRoleArray();

  await updateEmployeeArray();

  arrayOfEmployees.push("This employee has no manager");

  // Array with Add Employee prompts
  const addEmployeePrompts = [
    {
      name: "firstName",
      type: "input",
      message: "Enter the employee's first name:",
      validate: function (input) {
        const valid = input !== "";
        return valid || "Please enter a name";
      },
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter the employee's last name:",
      validate: function (input) {
        const valid = input !== "";
        return valid || "Please enter a name";
      },
    },
    {
      name: "roleSelected",
      type: "list",
      message: "What is this employee's role?",
      choices: arrayOfRoles,
    },

    {
      name: "managerSelected",
      type: "list",
      message: "Who is this employee's manager?",
      choices: arrayOfEmployees,
    },
  ];

  inquirer.prompt(addEmployeePrompts).then(async function (answers) {
    const newFirstName = answers.firstName;
    const newLastName = answers.lastName;
    const roleTitle = answers.roleSelected;
    const newManager = answers.managerSelected;

    if (newManager === "This employee has no manager") {
      let newEmployeeManagerId = "NULL";
      let employeeRoleIdFromTable = await roleClass.sqlGetRoleIdFromRoleTitle(sqldb, roleTitle);
      let newEmployeeRoleId = employeeRoleIdFromTable[0].id;

      await employeeClass.sqlAddEmployee(sqldb, newFirstName, newLastName, newEmployeeRoleId, newEmployeeManagerId);

      console.log(`New Employee Added: ${newFirstName} ${newLastName}
      `);
    } else {
      const newManagerNameArray = newManager.split(" ");
      const newManagerFirstName = newManagerNameArray[0];
      const newManagerLastName = newManagerNameArray[1];

      const employeeManagerIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, newManagerFirstName, newManagerLastName);
      const newEmployeeManagerId = employeeManagerIdFromTable[0].id;

      let employeeRoleIdFromTable = await roleClass.sqlGetRoleIdFromRoleTitle(sqldb, roleTitle);
      let newEmployeeRoleId = employeeRoleIdFromTable[0].id;

      await employeeClass.sqlAddEmployee(sqldb, newFirstName, newLastName, newEmployeeRoleId, newEmployeeManagerId);

      console.log(`New Employee Added: ${newFirstName} ${newLastName}
      `);
    }

    runMainMenu();
  });
}

/*
 updateRoleArray()
  select all role titles and put them into an array
    * 
*/
async function updateRoleArray() {
  let roleTitles = await roleClass.sqlGetAllRoleTitles(sqldb);

  arrayOfRoles = [];

  roleTitles.forEach((roleTitle) => {
    for (let key in roleTitle) {
      arrayOfRoles.push(roleTitle[key]);
    }
  });

  return arrayOfRoles;
}

/*
 updateEmployeeArray()
  select all role titles and put them into an array
    * 
*/
async function updateEmployeeArray() {
  let employeeNames = await employeeClass.sqlGetAllEmployeeNames(sqldb);

  arrayOfEmployees = [];

  employeeNames.forEach((employeeName) => {
    for (let key in employeeName) {
      arrayOfEmployees.push(employeeName[key]);
    }
  });

  return arrayOfEmployees;
}

/*
 updateEmployeeRole()
  replace existing role with new role
    * 
*/
async function updateEmployeeRole() {
  await updateEmployeeArray();
  await updateRoleArray();

  // Array with Update Employee Role prompts
  const updateEmployeeRolePrompts = [
    {
      name: "employeeToUpdate",
      type: "list",
      message: "Please select an employee to update their role:",
      choices: arrayOfEmployees,
    },

    {
      name: "newRoleAssignment",
      type: "list",
      message: "What role would you like to assign to the employee?",
      choices: arrayOfRoles,
    },
  ];

  inquirer.prompt(updateEmployeeRolePrompts).then(async function (answers) {
    const employeeWithUpdatedRole = answers.employeeToUpdate;
    const updatedRoleForEmployee = answers.newRoleAssignment;

    const employeeWithUpdatedRoleArray = employeeWithUpdatedRole.split(" ");
    const updatedEmployeeFirstName = employeeWithUpdatedRoleArray[0];
    const updatedEmployeeLastName = employeeWithUpdatedRoleArray[1];

    const employeeIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, updatedEmployeeFirstName, updatedEmployeeLastName);
    const idOfUpdatedEmployee = employeeIdFromTable[0].id;

    let employeeRoleIdFromTable = await roleClass.sqlGetRoleIdFromRoleTitle(sqldb, updatedRoleForEmployee);
    let updatedRoleIdForEmployee = employeeRoleIdFromTable[0].id;

    await employeeClass.sqlUpdateEmployeeRole(sqldb, idOfUpdatedEmployee, updatedRoleIdForEmployee);
    console.log(`Updated Employee Role for: ${employeeWithUpdatedRole}
    `);

    runMainMenu();
  });
}

/*
 updateEmployeeManager()
  replace existing manager with new manager
    * 
*/
async function updateEmployeeManager() {
  await updateEmployeeArray();

  arrayOfPossibleManagers = arrayOfEmployees.push("This employee has no manager");

  // Array with Update Employee Manager prompts
  const updateEmployeeManagerPrompts = [
    {
      name: "employeeToBeUpdated",
      type: "list",
      message: "Please select an employee to update their manager:",
      choices: arrayOfEmployees,
    },

    {
      name: "updatedManager",
      type: "list",
      message: "Please select an employee to update their manager:",
      choices: arrayOfEmployees,
    },
  ];

  inquirer.prompt(updateEmployeeManagerPrompts).then(async function (answers) {
    const employeeWithUpdatedManager = answers.employeeToBeUpdated;
    const updatedManagerForEmployee = answers.updatedManager;

    if (updatedManagerForEmployee === "This employee has no manager") {
      let idOfUpdatedEmployeesManager = "NULL";
      const employeeWithUpdatedManagerArray = employeeWithUpdatedManager.split(" ");
      const updatedEmployeeFirstName = employeeWithUpdatedManagerArray[0];
      const updatedEmployeeLastName = employeeWithUpdatedManagerArray[1];
      let employeeIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, updatedEmployeeFirstName, updatedEmployeeLastName);
      const idOfUpdatedEmployee = employeeIdFromTable[0].id;
      await employeeClass.sqlUpdateEmployeeManager(sqldb, idOfUpdatedEmployee, idOfUpdatedEmployeesManager);
      console.log(`The manager of ${updatedEmployeeFirstName} ${updatedEmployeeLastName} has been updated.
      `);
    } else {
      const employeeWithUpdatedManagerArray = employeeWithUpdatedManager.split(" ");
      const updatedEmployeeFirstName = employeeWithUpdatedManagerArray[0];
      const updatedEmployeeLastName = employeeWithUpdatedManagerArray[1];

      const employeesNewManagerArray = updatedManagerForEmployee.split(" ");
      const updatedEmployeesManagersFirstName = employeesNewManagerArray[0];
      const updatedEmployeesManagersLastName = employeesNewManagerArray[1];

      let employeeIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, updatedEmployeeFirstName, updatedEmployeeLastName);
      const idOfUpdatedEmployee = employeeIdFromTable[0].id;

      let managerIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, updatedEmployeesManagersFirstName, updatedEmployeesManagersLastName);
      const idOfUpdatedEmployeesManager = managerIdFromTable[0].id;

      await employeeClass.sqlUpdateEmployeeManager(sqldb, idOfUpdatedEmployee, idOfUpdatedEmployeesManager);
      console.log(`The manager of ${updatedEmployeeFirstName} ${updatedEmployeeLastName} has been updated.
      `);
    }

    runMainMenu();
  });
}

/*
 viewEmployeesByManager()
  select employees based on their manager
    * 
*/
async function viewEmployeesByManager() {
  await updateEmployeeArray();

  // Array with View Employees By Manager prompts
  const viewEmployeesByManagerPrompt = [
    {
      name: "managerChosen",
      type: "list",
      message: "Please select an employee to see who they manage:",
      choices: arrayOfEmployees,
    },
  ];
  inquirer.prompt(viewEmployeesByManagerPrompt).then(async function (answers) {
    const manager = answers.managerChosen;
    const managerNameArray = manager.split(" ");
    const updatedEmployeeFirstName = managerNameArray[0];
    const updatedEmployeeLastName = managerNameArray[1];
    let employeeIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, updatedEmployeeFirstName, updatedEmployeeLastName);
    const idOfManager = employeeIdFromTable[0].id;
    const result = await employeeClass.sqlViewEmployeesByManager(sqldb, idOfManager);
    if (result) {
      console.log(`${updatedEmployeeFirstName} ${updatedEmployeeLastName} manages these employees:
      `);
      console.table(result);
    } else {
      console.log(`${updatedEmployeeFirstName} ${updatedEmployeeLastName} does not manage any employees.
      `);
    }
    runMainMenu();
  });
}

/*
 viewEmployeesByDepartment()
  select employees based on their department
    * 
*/
async function viewEmployeesByDepartment() {
  await updateDepartmentsArray();

  // Array with View Employees By Manager prompts
  const viewEmployeesByDepartmentPrompt = [
    {
      name: "departmentChosen",
      type: "list",
      message: "Please select a department to view its employees:",
      choices: arrayOfDepartments,
    },
  ];
  inquirer.prompt(viewEmployeesByDepartmentPrompt).then(async function (answers) {
    const departmentName = answers.departmentChosen;
    let departmentIdFromTable = await departmentClass.sqlGetDepartmentIdFromDepartmentName(sqldb, departmentName);
    const idOfDepartment = departmentIdFromTable[0].id;
    const result = await employeeClass.sqlViewEmployeesByDepartment(sqldb, idOfDepartment);
    if (result) {
      console.log(`${departmentName} has these employees:
      `);
      console.table(result);
    } else {
      console.log(`${departmentName} has no employees.
      `);
    }
    runMainMenu();
  });
}

/*
 deleteDepartment()
  delete a department from the department table
    * 
*/
async function deleteDepartment() {
  await updateDepartmentsArray();

  const deleteDepartmentPrompt = [
    {
      name: "departmentChosen",
      type: "list",
      message: "Please select a department to delete:",
      choices: arrayOfDepartments,
    },
  ];
  inquirer.prompt(deleteDepartmentPrompt).then(async function (answers) {
    const departmentName = answers.departmentChosen;
    let departmentIdFromTable = await departmentClass.sqlGetDepartmentIdFromDepartmentName(sqldb, departmentName);
    const idOfDepartment = departmentIdFromTable[0].id;
    await departmentClass.sqlDeleteDepartment(sqldb, idOfDepartment);
    console.log(`${departmentName} has been deleted
    `);
    runMainMenu();
  });
}

/*
 deleteRole()
  delete a role from the role table
    * 
*/
async function deleteRole() {
  await updateRoleArray();

  const deleteRolePrompt = [
    {
      name: "roleChosen",
      type: "list",
      message: "Please select a role to delete:",
      choices: arrayOfRoles,
    },
  ];
  inquirer.prompt(deleteRolePrompt).then(async function (answers) {
    const roleTitle = answers.roleChosen;
    let roleIdFromTable = await roleClass.sqlGetRoleIdFromRoleTitle(sqldb, roleTitle);
    const idOfRole = roleIdFromTable[0].id;
    await roleClass.sqlDeleteRole(sqldb, idOfRole);
    console.log(`${roleTitle} has been deleted.
    `);
    runMainMenu();
  });
}

/*
 deleteEmployee()
  delete an employee from the employee table
    * 
*/
async function deleteEmployee() {
  await updateEmployeeArray();

  const deleteEmployeePrompt = [
    {
      name: "employeeChosen",
      type: "list",
      message: "Please select a role to delete:",
      choices: arrayOfEmployees,
    },
  ];
  inquirer.prompt(deleteEmployeePrompt).then(async function (answers) {
    const employeeToDelete = answers.employeeChosen;
    const employeeNameArray = employeeToDelete.split(" ");
    const updatedEmployeeFirstName = employeeNameArray[0];
    const updatedEmployeeLastName = employeeNameArray[1];
    let employeeIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, updatedEmployeeFirstName, updatedEmployeeLastName);
    const idOfEmployoee = employeeIdFromTable[0].id;
    await employeeClass.sqlDeleteEmployee(sqldb, idOfEmployoee);
    console.log(`${employeeToDelete} has been deleted.
    `);
    runMainMenu();
  });
}

/*
 viewTotalUtilizedBudgetOfADepartment()
  see the combined salaries of all employees in a department
    * 
*/
async function viewTotalUtilizedBudgetOfADepartment() {
  await updateDepartmentsArray();

  const viewDepartmentBudgetPrompt = [
    {
      name: "departmentChosen",
      type: "list",
      message: "Please select a department to see its total utilized budget:",
      choices: arrayOfDepartments,
    },
  ];
  inquirer.prompt(viewDepartmentBudgetPrompt).then(async function (answers) {
    const departmentName = answers.departmentChosen;
    let departmentIdFromTable = await departmentClass.sqlGetDepartmentIdFromDepartmentName(sqldb, departmentName);
    const idOfDepartment = departmentIdFromTable[0].id;

    let allSalariesInDepartment = await departmentClass.sqlViewDepartmentBudget(sqldb, idOfDepartment);

    let salaryArrayAsInt = [];

    allSalariesInDepartment.forEach((salary) => {
      for (let key in salary) {
        salaryArrayAsInt.push(parseInt(salary[key]));
      }
    });

    let totalUtilizedBudget = 0;

    for (let i = 0; i < salaryArrayAsInt.length; i++) {
      totalUtilizedBudget += salaryArrayAsInt[i];
    }
    console.log(`The total utilized budget of ${departmentName} is ${totalUtilizedBudget}
    `);
    runMainMenu();
  });
}

/*
 quitTracker()
  quit the app
    * 
*/
function quitTracker() {
  console.log("Thank you for using the Employee Tracker!");
  process.exit();
}

/*
 init()
  initializatize the application
    * calls bannerMain function
*/
function init() {
  bannerMain();
}

// Initialize the application by calling init function
init();
