
INSERT INTO department (deptName)
VALUES
  ('Human Resources'),
  ('Accounting');

INSERT INTO roles (title, salary, department_id) 
VALUES 
 ('HR Manager', 23987, 1),
 ('Accountant', 789, 2);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES 
 ('BOB', 'smith', 1, null),
 ('sam', 'smith', 2, 1);