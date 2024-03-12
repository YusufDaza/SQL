USE employee_db;
INSERT INTO department(name)
VALUES('Sales'), //1
      ('Engineering'), //2
      ('Finance'), //3
      ('Legal'), //4;

      INSERT INTO role(title, department_id, salary)
      VALUES('Sales Lead',1, 100000),
      ('Salesperson',1, 80000),
      ('Lead Engineer',2, 150000),
      ('Software Engineer',2, 120000),
      ('Account Manager',3, 160000),
      ('Accountant',3, 125000),
      ('Legal Team Lead',4, 250000),
      ('Lawyer',4, 190000);
      
      INSERT INTO employee(first_name, last_name, role_id)
      VALUES
      ('John', 'Doe',1),
      ('Mike', 'Chan',1),
      ('Ashley', 'Rodriguez',2),
      ('Kevin', 'Tupik',2),
      ('Kunal', 'Singh',3),
      ('Malia', 'Brown',3),
      ('Sarah', 'Lourd',4),
      ('Tom', 'Allen',4);


      UPDATE employee set manager_id=1 where id=2;