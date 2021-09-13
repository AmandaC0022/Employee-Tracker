const inquirer = require('inquirer');
// const fs = require('fs');
const cTable = require('console.table');
const db = require('./server'); 

mainScreen = () => { 
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'toDo',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ]).then((userChoice) => {
        switch(userChoice.toDo) {
            case "View All Employees": 
                viewAllEmployees(); 
                break; 
            case "Add Employee":
                addEmployee(); 
                break; 
            case "Update Employee Role":
                updateEmployee(); 
                break; 
            case "View All Roles":
                viewAllRoles(); 
                break; 
            case "Add Role":
                addRole(); 
                break;
            case "View All Departments":
                viewAllDepartments(); 
                break; 
            case "Add Department":
                addDepartment(); 
                break; 
            case 'Quit': 
                console.log('Thank you for using the Employee Tracker. Have a great day!'); 
                break; 
        }
    }); 
}; 

viewAllEmployees = () => {
    //displays the employees table 
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) {
            console.error(err); 
        }
        var allEmployees = results; 
        console.table('Employees', allEmployees.slice(0)); 
    }); 
    mainScreen(); 
}; 

addEmployee = () => { 
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: answer => {
                if (answer !== "") {
                    return true; 
                } 
                return "Please enter at least one character."
            } 
        }, 
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
            validate: answer => {
                if (answer !== "") {
                    return true; 
                } 
                return "Please enter at least one character."
            }
        }, 
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            //Gives a list of all of the roles from the db  
            choices: []
        }, 
        {
            type: 'list',
            name: 'managers_name',
            message: "Who is the employee's manager?",
            //Gives a list of all of the employees from the db 
            choices: []
        }
    ]).then((answers) => {
        //adds new employee to employee database 
        fs.writeFile('./db/employees.sql', generatedb(answers), () => {
            console.log(`${answers.first_name} ${answers.last_name} has been added to the database.`); 
        })
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    }) 
    mainScreen();
}; 

updateEmployee = () => {  
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'employees_name',
            message: "Which employee's role do you want to update?",
            //displays the list of employees
            choices: []
        }, 
        {
            type: 'list',
            name: 'employees_role',
            message: "Which role do you want to assign the selected employee?",
            //gives a list of all of the roles
            choices: []
        }
    ]).then((answers) => {
        //validates and prints Updated employee's role  
        fs.writeFile('./db/employees.sql', generatedb(answers), () => {
            console.log(`Thank you. ${answers.employees_name}'s role has been updated.`); 
        })
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    }) 
    mainScreen();
}; 

viewAllRoles = () => {
    // Shows the Roles table from seeds file 
    // NOTE: you can filter what exactly is shown by changing * to title, salary, etc. 
    db.query('SELECT * FROM role', function (err, results) {
        if (err) {
            console.error(err); 
        }
        var allRoles = results; 
        console.table('Roles', allRoles.slice(0)); 
        }); 
    mainScreen();
}; 

addRole = () => {
    //asks what is the name of the role? 
    //asks what is the salary of the role? 
    //asks what department does the role belong to? and gives you the list of departments 
    //validates then prints New role has been added to the database 
    mainScreen();
}; 

viewAllDepartments = () => {
    //this displays the department table 
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
        console.error(err); 
        }
        var allDepartments = results; 
        console.table('Departments', allDepartments.slice(0)); 
    }); 
    mainScreen();
}; 

addDepartment = () => {
    //asks what is the name of the department? 
    //validates the input then prints Added Department to the database 
    mainScreen();
}; 

//initializes the app 
mainScreen(); 
