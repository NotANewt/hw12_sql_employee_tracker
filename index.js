const inquirer = require("inquirer");
const express = require("express");
const cTable = require("console.table");
const app = express();
const departmentClass = require("./lib/department.js");

// Array with Main Menu prompt
const mainMenuPrompt = [
  {
    name: "mainOptions",
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
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
 viewAllEmployees()
  returns table with all employees
    * 
*/
function viewAllEmployees() {
  console.log("They chose to View All Employees");
}

/*
 addEmployee()
  add new employee to employee table
    * 
*/
function addEmployee() {
  console.log("They chose to Add Employee");
}

/*
 updateEmployeeRole()
  add new employee to employee table
    * 
*/
function updateEmployeeRole() {
  console.log("They chose to Update Employee Role");
}

/*
 viewAllRoles()
  returns roles table
    * 
*/
function viewAllRoles() {
  console.log("They chose to View All Roles");
}

/*
 addRole()
  add new role to role table
    * 
*/
function addRole() {
  console.log("They chose to Add Role");
}

/*
 viewAllDepartments()
  returns department table
    * 
*/
function viewAllDepartments() {
  console.log("They chose to View All Departments");
}

/*
 addDepartment()
  add new department to department table
    * 
*/
function addDepartment() {
  console.log("They chose to Add Department");
}

/*
 quitTracker()
  quit the app
    * 
*/
function quitTracker() {
  console.log("They chose to Quit");
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

// console.table([
//   {
//     name: "foo",
//     age: 10,
//   },
//   {
//     name: "bar",
//     age: 20,
//   },
// ]);
