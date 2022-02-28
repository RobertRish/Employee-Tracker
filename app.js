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
                    // below is what askbcs had me alter.  look at .query() in docs
                    db.query("SELECT * FROM department", function (err, result, fields) {
                        console.log(result);
                        // console.table(result);
                    })
                } else if (answers.opener === "view all roles") {
                    db.query("SELECT * FROM roles")
                    .then((data) => {
                    console.table(data);
                    });
                } else if (answers.opener === "view all employees") {
                    db.query("SELECT * FROM employees")
                    .then((data) => {
                    console.table(data);
                        });
                    };
            });
    };
            
        

userQuery();

  // 1. Figure out package.json file
  // 2. Figure out inquirer.js prompts
  // 3. Figure out how to put user inputs into db
  // 4. Figure out how to display them with console.table
  // 5. Figure out how to take screen capture
  // 6. Figure out how to input video into readme 