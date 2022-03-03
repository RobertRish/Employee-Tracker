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
                    updateEmployee();
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
            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answers.first_name, answers.last_name, answers.roleId, answers.manager_id], function (err, result, fields) {
                viewEmployees();
            })
        })
    };

    function updateEmployee() {
        inquirer.prompt([
            {
                type: "number",
                name: "role_id",
                message: "What is the role id # for the new role to you would like this employee to have?"
            },
            {
                type: "number",
                name: "employee_id",
                message: "What is the employee's employee id?"
            },
        ])
            .then(answers => {
            db.query("UPDATE employee SET role_id = (?) WHERE id = (?)", [answers.role_id, answers.employee_id], function (err, result, fields) {
                viewEmployees();
            })
        })
    };





userQuery();


