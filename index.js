const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const mysql2 = require("mysql2");

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
    port: 3306
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    menu();
});

function menu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "option",
            choices: [
                { name: "View all departments", value: "viewDepartments" },
                { name: "View all roles", value: "viewRoles" },
                { name: "View all employees", value: "viewEmployees" },
                { name: "Add a department", value: "addDepartment" },
                { name: "Add a role", value: "addRole" },
                { name: "Add an employee", value: "addEmployee" },
                { name: "Update an employee role", value: "updateEmployeeRole" },
                { name: "Quit", value: "quit" }
            ]
        }
    ]).then(response => {
        switch (response.option) {
            case "viewDepartments":
                viewAllDepartments();
                break;
            case "viewRoles":
                viewAllRoles();
                break;
            case "viewEmployees":
                viewAllEmployees();
                break;
            case "addDepartment":
                addDepartment();
                break;
            case "addRole":
                addRole();
                break;
            case "addEmployee":
                addEmployee();
                break;
            case "updateEmployeeRole":
                updateEmployeeRole();
                break;
            case "quit":
                console.log("Exiting the application.");
                db.end(); // Close the database connection
                process.exit(0);
                break;
            default:
                console.log("Invalid option. Please choose again.");
                menu();
        }
    });
}

function viewAllDepartments() {
    db.query("SELECT id, name AS department FROM department", (err, departments) => {
        if (err) throw err;
        printTable(departments);
        menu();
    });
}

function viewAllRoles() {
    db.query(`SELECT role.id, role.title, role.salary, department.name AS department
              FROM role
              LEFT JOIN department ON role.department_id = department.id`, (err, roles) => {
        if (err) throw err;
        printTable(roles);
        menu();
    });
}

function viewAllEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,
                    role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id
              LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, employees) => {
        if (err) throw err;
        printTable(employees);
        menu();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the department:",
            name: "name"
        }
    ]).then(response => {
        db.query("INSERT INTO department (name) VALUES (?)", [response.name], (err) => {
            if (err) throw err;
            console.log(`Department ${response.name} added successfully!`);
            menu();
        });
    });
}

function addRole() {
    db.query("SELECT * FROM department", (err, departments) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "input",
                message: "Enter the title of the role:",
                name: "title"
            },
            {
                type: "input",
                message: "Enter the salary for this role:",
                name: "salary"
            },
            {
                type: "list",
                message: "Select the department for this role:",
                name: "department_id",
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ]).then(response => {
            db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                [response.title, response.salary, response.department_id],
                (err) => {
                    if (err) throw err;
                    console.log(`Role ${response.title} added successfully!`);
                    menu();
                }
            );
        });
    });
}

function addEmployee() {
    db.query("SELECT * FROM role", (err, roles) => {
        if (err) throw err;

        db.query("SELECT * FROM employee WHERE manager_id IS NULL", (err, managers) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the first name of the employee:",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "Enter the last name of the employee:",
                    name: "last_name"
                },
                {
                    type: "list",
                    message: "Select the role for this employee:",
                    name: "role_id",
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                },
                {
                    type: "list",
                    message: "Select the manager for this employee:",
                    name: "manager_id",
                    choices: managers.map(manager => ({
                        name: `${manager.first_name} ${manager.last_name}`,
                        value: manager.id
                    }))
                }
            ]).then(response => {
                db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                    [response.first_name, response.last_name, response.role_id, response.manager_id],
                    (err) => {
                        if (err) throw err;
                        console.log(`Employee ${response.first_name} ${response.last_name} added successfully!`);
                        menu();
                    }
                );
            });
        });
    });
}

function updateEmployeeRole() {
    db.query("SELECT * FROM employee", (err, employees) => {
        if (err) throw err;

        db.query("SELECT * FROM role", (err, roles) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    message: "Select the employee you want to update:",
                    name: "employee_id",
                    choices: employees.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))
                },
                {
                    type: "list",
                    message: "Select the new role for this employee:",
                    name: "role_id",
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                }
            ]).then(response => {
                db.query("UPDATE employee SET role_id = ? WHERE id = ?",
                    [response.role_id, response.employee_id],
                    (err) => {
                        if (err) throw err;
                        console.log("Employee role updated successfully!");
                        menu();
                    }
                );
            });
        });
    });
}
