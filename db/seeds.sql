INSERT INTO department (name)
VALUES 
    ("Engineering"), 
    ("Management"),
    ("Sales"), 
    ("Fiance"), 
    ("Legal"); 

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Lead Engineer", 150000, 2), 
    ("Web Developer", 80000, 1), 
    ("Accountant", 80000, 4), 
    ("Salesperson", 60000, 3), 
    ("Sales Lead", 100000, 3), 
    ("Software Engineer", 120000, 1), 
    ("Lawyer", 190000, 5); 

INSERT INTO employees (first_name, last_name, role_id)
VALUES 
    ("Amanda", "Morgan", 2), 
    ("Chris", "Morgan", 4), 
    ("Caitlin", "Hendrix", 2), 
    ("Ben", 'Hendrix', 3); 

