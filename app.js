const inquirer = require('inquirer');
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
                    db.query("SELECT * FROM departments")
                        .then((data) => {
                        console.table(data);
                        });
                    }
            });
        };

userQuery();

  // 1. Figure out package.json file
  // 2. Figure out inquirer.js prompts
  // 3. Figure out how to put user inputs into db
  // 4. Figure out how to display them with console.table
  // 5. Figure out how to take screen capture
  // 6. Figure out how to input video into README