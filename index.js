const inquirer = require("inquirer")
const { printTable } = require("console-table-printer")
const mysql2 = require("mysql2")

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
    port: 3306
})

db.connect(() => {
    menu()
})

function menu() {
    // / view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role    

    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "option",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]

        }
    ])
        .then(response => {
            if (response.option === "view all employees") {
                viewAllEmployees()
            }
            else if (response.option === "view all roles") {
                viewAllRoles();
            }
            else if (response.option === "add an employee") {
                addEmployee()
            }
            else if (response.option === "update an employee role") {

            }
        })
    }        

    function updateEmployee() {

        db.query(`SELECT id as value, CONCAT(first_name,' ', last_name) as name from employee`, (err,employeeData) => {
           inquirer.prompt([

            {
                type: "list", 
                message: "What is new title for the employee?",
                name: "employee_id", 
                choice: employeeData 
            }
            ])


        }