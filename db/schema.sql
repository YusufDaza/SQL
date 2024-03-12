CREATE DATABASE IF NOT EXISTS company_db;
CREATE DATABASE employee_db;

USE employee_db;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) INT NOT NULL,
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,

     department_id INT 
     FOREIGN KEY (department_id)
     REFERENCES department(id) 
     ON DELETE SET NULL 

     role_id INT,
     FOREIGN KEY (role_id) 
     REFERENCES roles(id),
     ON DELETE SET NULL

     manager_id INT
     FOREIGN KEY (manager_id) 
     REFERENCES employee(id)
     ON DELETE SET NULL
);

-- Sample Data for Departments Table
INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('Marketing'),
    ('Finance');

-- Sample Data for Roles Table
INSERT INTO roles (title, salary, department_id) VALUES
    ('Software Engineer', 80000, 1),
    ('Marketing Manager', 70000, 2),
    ('Financial Analyst', 65000, 3);

-- Note: Sample data for employees can be added as per your requirements.

