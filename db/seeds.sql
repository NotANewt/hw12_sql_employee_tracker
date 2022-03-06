-- seed department table
INSERT INTO department (name)
VALUES ("Advanced Weaponry"),
       ("Research and Develpment"),
       ("Urban Planning"),
       ("Space and Aeronautics"),
       ("Public Security Forces");

-- seed role table
INSERT INTO role (title, salary, department_id)
VALUES ("Director", 100000, 1),
       ("Developer", 80000, 1),
       ("Professor", 100000, 2),
       ("Research Assistant", 40000, 2),
       ("Executive", 500000, 3),
       ("Researcher", 60000, 3),
       ("Program Head", 200000, 4),
       ("Airship Captain", 90000, 4),
       ("Head of Public Safety", 150000, 5),
       ("Lead Auditor", 100000, 5),
       ("Recruiter", 75000, 5),
       ("Union Executive", 95000, 5),
       ("Soldier", 50000, 5);

-- seed managers into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Scarlet", "Sukaretto", 1, null),
       ("Hojo", "Hakase", 3, null),
       ("Hollander", "Horanda", 3, null),
       ("Reeve", "Tuesti", 5, null),
       ("Palmer", "Paruma", 7, null),
       ("Heidegger", "Haidekka", 9, null);

-- seed employees that have managers and are also managers
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tseng", "Tson", 10, 6),
       ("Lazard", "Deusericus", 12, 6);

-- seed employees that have managers and are not managers
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sister", "Ray", 2, 1),
       ("Proud", "Clod", 2, 1),       
       ("Azul", "Aoki", 4, 2),
       ("Roso", "Crimson", 4, 2),
       ("Angeal", "Hewley", 4, 3),
       ("Cait", "Sith", 6, 4),
       ("Cid", "Highwind", 8, 5),
       ("Reno", "Leno", 11, 7), 
       ("Rude", "Rudo", 11, 7),
       ("Cissnei", "Shuriken", 11, 7),
       ("Elena", "Yrena", 11, 7),
       ("Zach", "Fair", 13, 8),
       ("Sephiroth", "Sefirosu", 13, 8),
       ("Genesis", "Rhapsodos", 13, 8),
       ("Cloud", "Strife", 13, 8);



       





