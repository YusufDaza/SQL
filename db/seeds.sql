USE employee_db;
INSERT INTO department(name)
VALUES('Sales'), //1
      ('Engineering')
//2

      INSERT INTO role(title,department_id,salary)
      VALUES('Sales Lead', 1, 100000),
      ('Sales Person',1, 1,80000),
      ('Lead Engineering',2, 150000);
      INSERT INTO employee(first_name, last_name, role_id,)
      VALUES
      ('John', 'Doe',1),
      ('Mike', 'Chan',1);


      UPDATE employee set manager_id=1 where id=2