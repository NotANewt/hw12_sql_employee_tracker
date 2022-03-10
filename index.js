const inquirer = require("inquirer");
const cTable = require("console.table");
const departmentClass = require("./lib/department.js");
const roleClass = require("./lib/role.js");
const employeeClass = require("./lib/employee.js");

let sqldb = require("./db.js");

let arrayOfDepartments = [];
let arrayOfRoles = [];
let arrayOfEmployees = [];

// Array with Main Menu prompt
const mainMenuPrompt = [
  {
    name: "mainOptions",
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Departments", "Add Department", "View All Roles", "Add Role", "View All Employees", "Add Employee", "Update Employee Role", "Quit"],
  },
];

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
  inquirer.prompt(addDepartmentPrompt).then(async function (answers) {
    const newDepartmentName = answers.departmentName;
    const addNewDepartment = await departmentClass.sqlAddDepartment(sqldb, newDepartmentName);
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
    const newRoleDepartment = answers.departmentSelected;
    const roleDepartmentIdFromTable = await departmentClass.sqlGetDepartmentIdFromDepartmentName(sqldb, newRoleDepartment);
    const newRoleDepartmentId = roleDepartmentIdFromTable[0].id;

    const addNewRole = await roleClass.sqlAddRole(sqldb, newRoleTitle, newRoleSalary, newRoleDepartmentId);
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
    const newEmployeeRole = answers.roleSelected;
    const newManager = answers.managerSelected;

    if (newManager === "This employee has no manager") {
      newEmployeeManagerId = "NULL";
    } else {
      const newManagerNameArray = newManager.split(" ");
      const newManagerFirstName = newManagerNameArray[0];
      const newManagerLastName = newManagerNameArray[1];

      const employeeManagerIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, newManagerFirstName, newManagerLastName);
      const newEmployeeManagerId = employeeManagerIdFromTable[0].id;
    }

    const employeeRoleIdFromTable = await roleClass.sqlGetRoleIdFromRoleTitle(sqldb, newEmployeeRole);
    const newEmployeeRoleId = employeeRoleIdFromTable[0].id;

    const addNewEmployee = await employeeClass.sqlAddEmployee(sqldb, newFirstName, newLastName, newEmployeeRoleId, newEmployeeManagerId);

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
  add new employee to employee table
    * 
*/
async function updateEmployeeRole() {
  await updateEmployeeArray();
  await updateRoleArray();

  // Array with Update Employee Role prompts
  const updateEmployeeRolePrompts = [
    {
      name: "employeeWhoseRoleWillBeUpdated",
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
    const employeeWithUpdatedRole = answers.employeeWhoseRoleWillBeUpdated;
    const updatedRoleForEmployee = answers.newRoleAssignment;

    const employeeWithUpdatedRoleArray = employeeWithUpdatedRole.split(" ");
    const updatedEmployeeFirstName = employeeWithUpdatedRoleArray[0];
    const updatedEmployeeLastName = employeeWithUpdatedRoleArray[1];

    const employeeIdFromTable = await employeeClass.sqlGetEmployeeIdFromEmployeeName(sqldb, updatedEmployeeFirstName, updatedEmployeeLastName);
    const idOfUpdatedEmployee = employeeIdFromTable[0].id;

    const employeeRoleIdFromTable = await roleClass.sqlGetRoleIdFromRoleTitle(sqldb, updatedRoleForEmployee);
    const updatedRoleIdForEmployee = employeeRoleIdFromTable[0].id;

    const updateEmployeeWithNewRole = await employeeClass.sqlUpdateEmployeeRole(sqldb, idOfUpdatedEmployee, updatedRoleIdForEmployee);

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
    * calls figletMain function
*/
function init() {
  bannerMain();
}

// Initialize the application by calling init function
init();
