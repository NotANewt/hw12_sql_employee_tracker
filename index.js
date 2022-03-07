const inquirer = require("inquirer");
const cTable = require("console.table");

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
 figletMain()
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
    console.log(answers);
    // const mainMenuAnswer = new manager(answers);

    // newManagerObj.name = employeeManager.getName();
    // newManagerObj.id = employeeManager.getId();
    // newManagerObj.email = employeeManager.getEmail();
    // newManagerObj.officeNumber = employeeManager.getOfficeNumber();
    // newManagerObj.role = employeeManager.getRole();

    // let whatNext = answers.whatNext;

    // if (whatNext === "Finish Building My Team") {
    //   finishBuildingTeam();
    // } else if (whatNext === "Add An Enginner to My Team") {
    //   runInquirerForEngineer();
    // } else {
    //   runInquirerForIntern();
    // }
  });
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
