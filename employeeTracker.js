var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "qwerty1",
  database: "company_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "userAdd",
      type: "list",
      message: "What would you like to do?",
      choices: ["ADD ROLE", "ADD DEPARTMENT", "ADD EMPLOYEE", "VIEW ROLE", "VIEW DEPARTMENT", "VIEW EMPLOYEE"]
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.userAdd === "ADD ROLE") {
        addRole();
      }
      else if (answer.userAdd === "ADD DEPARTMENT") {
        addDepartment();
      } else if (answer.userAdd === "ADD EMPLOYEE") {
        addEmployee();

      } else if (answer.userAdd === "VIEW EMPLOYEE") {
        viewEmployee();

      } else if (answer.userAdd === "VIEW ROLE") {
        viewRole();

      } else if (answer.userAdd === "VIEW DEPARTMENT") {
        viewDepartment();
      }
    });
}

// function to handle posting new items up for auction
function addRole() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role?"
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is the department ID that the role falls under?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the role ID?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          dept_id: answer.departmentId,
          id: answer.roleId
        },
        function (err) {
          if (err) throw err;
          console.log("Role added successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function addDepartment() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "What is the department name?"
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is the department ID?",

        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.departmentName,
          id: answer.departmentId
        },
        function (err) {
          if (err) throw err;
          console.log("Department added successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}


function addEmployee() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter the employees first name:"
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the employees last name:"
      },
      {
        name: "roleId",
        type: "input",
        message: "Enter the employees role ID:",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "managerId",
        type: "input",
        message: "Enter the manager ID:",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "employeeId",
        type: "input",
        message: "Enter the employees ID:",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
          id: answer.employeeId
        },
        function (err) {
          if (err) throw err;
          console.log("Employee added successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}


function viewEmployee() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].first_name + " | " + results[i].last_name + " | " + results[i].manager_id + " | "  + results[i].id);
    }
    console.log("-----------------------------------");
    start();
  });
}

function viewRole() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].title + " | " + results[i].salary + " | " + results[i].dept_id + " | "  + results[i].id);
    }
    console.log("-----------------------------------");
    start();


  });
}

function viewDepartment() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].id + " | " + results[i].dept_name);
    }
    console.log("-----------------------------------");
    start();

  });
}
