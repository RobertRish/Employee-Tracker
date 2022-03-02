
INSERT INTO department (deptName)
VALUES
  ('Human Resources'),
  ('Accounting');

INSERT INTO roles (title, salary, department_id) 
VALUES 
 ('HR Manager', 12345, 1),
 ('Accountant', 987654321, 2);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES 
 ('Monica', 'Stenk', 1, null),
 ('Rench', 'Stipe', 2, 1);