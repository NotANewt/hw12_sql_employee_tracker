DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- department table with 
    -- id: INT PRIMARY KEY
    -- name: VARCHAR(30) to hold department name
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- role table with
    -- id: INT PRIMARY KEY
    -- title: VARCHAR(30) to hold role title
    -- salary: DECIMAL to hold role salary
    -- department_id: INT to hold reference to department role belongs to
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- employee table with
    -- id: INT PRIMARY KEY
    -- first_name: VARCHAR(30) to hold employee first name
    -- last_name: VARCHAR(30) to hold employee last name
    -- role_id: INT to hold reference to employee role
    -- manager_id: INT to hold reference to another employee that is the manager of the current employee 
        -- (null if the employee has no manager)
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL    
);
