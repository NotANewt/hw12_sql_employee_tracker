-- view all departments
    -- WHEN I choose to view all departments
    -- THEN I am presented with a formatted table showing department names and department ids
SELECT *
FROM department;

-- view all roles
    -- WHEN I choose to view all roles
    -- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
SELECT *
FROM role;

-- view all employees
    -- WHEN I choose to view all employees
    -- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, 
    -- job titles, departments, salaries, and managers that the employees report to
SELECT 
    employee.id, employee.first_name, employee.last_name, 
    role.title AS job_title, role.salary, 
    department.name AS department,
    CONCAT (manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id
ORDER BY employee.id

-- add a department
    -- WHEN I choose to add a department
    -- THEN I am prompted to enter the name of the department and that department is added to the database
INSERT INTO department (name)
VALUES
-- get this from user input
("new department name");

-- add a role
    -- WHEN I choose to add a role
    -- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
INSERT INTO role (title, salary, department_id)
VALUES
-- get this from user input
-- department_id needs to come from department.name
("role title", salary, department_id);

-- add an employee
    -- WHEN I choose to add an employee
    -- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
-- get this from user input
-- role_id needs to come from role.title
-- department_id needs to come from department.name
("role title", salary, department_id);

-- update an employee role
    -- WHEN I choose to update an employee role
    -- THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
UPDATE employee
SET role_id = 1
WHERE employee.id = employeeId


-- Bonus
-- Try to add some additional functionality to your application, such as the ability to do the following:

-- Update employee managers.

-- View employees by manager.

-- View employees by department.

-- Delete departments, roles, and employees.

-- View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
















-- COPIED FROM WEEK12 MINI PROJECT
SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;