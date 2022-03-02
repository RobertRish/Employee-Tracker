const inquirer = require('inquirer');
const mysql = require("mysql2/promise");
const db = require("./db/connection.js");
const cTable = require('console.table');

const userQuery = () => {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'opener',
        message: 'What would you like to do?',
        choices: [
                  "view all departments", 
                  "view all roles", 
                  "view all employees", 
                  "add a department", 
                  "add a role", 
                  "add an employee", 
                  "update an employee role"
                 ]
        }])
            .then(answers => {
                if (answers.opener === "view all departments") {
                    viewDepartments();
                } else if (answers.opener === "view all roles") {
                    viewRoles();
                } else if (answers.opener === "view all employees") {
                    viewEmployees();
                } else if (answers.opener === "add a department") {
                    addDepartment();
                } else if (answers.opener === "add a role") {
                    addRole();
                } else if (answers.opener === "add an employee") {
                    addEmployee();
                } else if (answers.opener === "update an employee role") {
                    db.query("SELECT * FROM employee", function (err, result, fields) {
                        console.table(result);
                        });
                }  
            });
    };
            
      function viewDepartments() {
        db.query("SELECT * FROM department", function (err, result, fields) {
            console.table(result);
            userQuery();
        });
      }  

      function viewRoles() {
        db.query("SELECT * FROM roles", function (err, result, fields) {
            console.table(result);
            userQuery();
        });
      } 

      function viewEmployees() {
        db.query("SELECT * FROM employee", function (err, result, fields) {
            console.table(result);
            userQuery();
        });
      } 

      function addDepartment() {
          inquirer.prompt([
              {
                type: "input",
                name: "deptName",
                message: "What is the name of the department you'd like to add?"
                }])
                    .then(answers => {
                            db.query("INSERT INTO department (deptName) VALUE (?);", [answers.deptName],  function (err, result, fields) {
                            viewDepartments();
                            userQuery();
                        })
                    })
      };

      function addRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role you'd like to add?"
            },
            {
                name: "salary",
                type: "number",
                message: "What is the compensation for this position? (Do not include '$'"
            },
            {
                type: "input",
                name: "deptID",
                message: "To which department does this position belong?  Please provide the numerical department id from the department table."
            },
        ])
            .then(answers => {
            db.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [answers.roleName, answers.salary, answers.deptID], function (err, result, fields) {
                viewRoles();
                userQuery();
            })

        })
            
    }

    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                type: "number",
                name: "roleId",
                message: "What role will this employee fill? Please provide the role ID from the roles table."
            },
            {
                name: "manager_id",
                type: "number",
                message: "Who is this employee's manager?  Please provide the employee ID of the manager from the employee table",
            },
        ])
            .then(answers => {
            db.query("INSERT INTO employee VALUES (?,?,?,?)", [answers.first_name, answers.last_name, answers.roleId, answers.manager_id], function (err, result, fields) {
                viewEmployees();
                userQuery();
            })
        })
    };

    function updateEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?",
            },
            {
                type: "number",
                name: "roleId",
                message: "What role will this employee fill? Please provide the role ID from the roles table."
            },
            {
                name: "manager_id",
                type: "number",
                message: "Who is this employee's manager?  Please provide the employee ID of the manager from the employee table",
            },
        ])
            .then(answers => {
            db.query("INSERT INTO roles VALUES (?,?,?,?)", [answers.first_name, answers.last_name, answers.roleId, answers.manager_id], function (err, result, fields) {
                viewEmployees();
                userQuery();
            })
        })
    };





userQuery();


  
  // 1. Figure out inquirer.js prompts 
  //    to return to opener after any action is taken
  // 2. Make sure tables are created correctly
  // 2. Figure out how to put user inputs into db
  // 3. Figure out how to JOIN tables in schema.sql https://www.w3schools.com/sql/sql_join.asp
  // 4. Redo walkthrough GIF