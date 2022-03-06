-- view all departments
    -- WHEN I choose to view all departments
    -- THEN I am presented with a formatted table showing department names and department ids

-- view all roles
    -- WHEN I choose to view all roles
    -- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

-- view all employees
    -- WHEN I choose to view all employees
    -- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, 
    -- job titles, departments, salaries, and managers that the employees report to

-- add a department
    -- WHEN I choose to add a department
    -- THEN I am prompted to enter the name of the department and that department is added to the database


-- add a role
    -- WHEN I choose to add a role
    -- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

-- add an employee
    -- WHEN I choose to add an employee
    -- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

-- update an employee role
    -- WHEN I choose to update an employee role
    -- THEN I am prompted to select an employee to update and their new role and this information is updated in the database 



















-- COPIED FROM WEEK12 MINI PROJECT
SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;