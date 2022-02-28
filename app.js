const inquirer = require('inquirer');
const mysql = require("mysql2/promise");
const db = require("./db/connection.js");
const cTable = require('console.table');

// db.query("source db.sql");
// db.query("source schema.sql");

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
                    db.query("SELECT * FROM roles", function (err, result, fields) {
                        console.table(result);
                    });
                } else if (answers.opener === "view all employees") {
                    // db.query("SELECT * FROM employee", function (err, result, fields) {
                    //     console.table(result);
                    //     });
                    viewEmployees();
                } else if (answers.opener === "add a department") {
                    // db.query("SELECT * FROM employee", function (err, result, fields) {
                    //     console.table(result);
                    //     });
                    addDepartment();
                } else if (answers.opener === "add a role") {
                    db.query("SELECT * FROM employee", function (err, result, fields) {
                        console.table(result);
                        });
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

      function viewEmployees() {
        db.query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee", function (err, result, fields) {
            console.table(result);
            userQuery();
        });
      } 

      function addDepartment() {
          inquirer.prompt({
              type: "input",
              name: "deptName",
              message: "What is the name of the department you'd like to add?"
          }).then(answers => {
              db.query("INSERT INTO department SET ?", {name: answers.deptName}, function (err, result, fields) {
                  viewDepartments();
              })
          })
      }

userQuery();


  
  // 1. Figure out inquirer.js prompts 
  //    to return to opener after any action is taken
  // 2. Make sure tables are created correctly
  // 2. Figure out how to put user inputs into db
  // 3. Figure out how to JOIN tables in schema.sql https://www.w3schools.com/sql/sql_join.asp
  // 4. Redo walkthrough GIF