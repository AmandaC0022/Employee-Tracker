const inquirer = require('inquirer');
// const fs = require('fs');
const cTable = require('console.table');
const allDepartments = require('./server'); 

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
    console.table([
        {
            name: 'foo',
            age: 10
        }, {
            name: 'bar',
            age: 20
        }
        ]);
    mainScreen(); 
}; 

addEmployee = () => {
    //asks What is the employee's first name? 
    //asks What is the employee's last name? 
    //asks What is the employee's role? then give a list of all of the roles 
    //asks Who is the employee's manager? then gives a list of all of the employees names. 
    //validates then prints Added name to the database
    mainScreen();
}; 

updateEmployee = () => {
    //asks Which employee's role do you want to update? then displays the list of employees
    //asks Which role do you want to assign the selected employee? then gives a list of all of the roles 
    //validates and prints Updated employee's role  
    mainScreen();
}; 

viewAllRoles = () => {
    //displays the roles table 
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
    mainScreen();
}; 

addDepartment = () => {
    //asks what is the name of the department? 
    //validates the input then prints Added Department to the database 
    mainScreen();
}; 

//initializes the app 
mainScreen(); 
