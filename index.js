const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const db = require('./server'); 
const generateDepartment = require('./utils/generateDepartment'); 
const generateEmployee = require('./utils/generateEmployee'); 
const generateRole = require('./utils/generateRole'); 
const connection = require('./db/query'); 
const updateRole = require('./utils/updateRole'); 

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
    db.query("SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', department.id, department.name AS Department, role.title AS 'Job Title', role.salary AS Salary, role.id, employees.manager_id AS Manager FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id", function (err, results) {
        if (err) {
            console.error(err); 
        }
        console.log(" "); 
        var allEmployees = results; 
        console.table('Employees', allEmployees.slice(0)); 
        mainScreen();
    });  
}; 

addEmployee = () => { 
    connection.findAllRoles().then(([rows])=>{
        let roles = rows; 
        const roleChoices = roles.map(({ id, title })=> ({
            name:title, 
            value:id, 
        }))
    connection.findAllEmployees().then(([rows]) => {
        let employees = rows; 
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name:first_name + " " + last_name,  
          value:id,   
        }))
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
            choices: roleChoices
        }, 
        {
            type: 'list',
            name: 'managers_name',
            message: "Who is the employee's manager?",
            //Gives a list of all of the employees from the db 
            choices: employeeChoices
        }
    ]).then((answers) => {
        generateEmployee(answers); 
        mainScreen();
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    }) 
    }); 
    }); 
}; 

updateEmployee = () => {  
    connection.findAllEmployees().then(([rows]) => {
        let employees = rows; 
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
          name:first_name + " " + last_name,  
          value:id,   
        }))
    connection.findAllRoles().then(([rows])=>{
        let roles = rows; 
        const roleChoices = roles.map(({ id, title })=> ({
            name:title, 
            value:id, 
        }))
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'employees_name',
            message: "Which employee's role do you want to update?",
            //displays the list of employees
            choices: employeeChoices
        }, 
        {
            type: 'list',
            name: 'employees_role',
            message: "Which role do you want to assign the selected employee?",
            //gives a list of all of the roles
            choices: roleChoices
        }
    ]).then((answers) => {
        //adds new employee to the database file 
        updateRole();   
        console.log(`Thank you. ${answers.employees_name}'s role has been updated.`);
        mainScreen(); 
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    });
    }); 
    }); 
}; 

viewAllRoles = () => {
    // Shows the Roles table from seeds file 
    db.query("SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', role.title AS 'Job Title', role.id FROM employees LEFT JOIN role on employees.role_id = role.id", function (err, results) {
        if (err) {
            console.error(err); 
        }
        var allRoles = results; 
        //adds some whitespace to display things better 
        console.log(" ")
        console.table('Roles', allRoles.slice(0)); 
        mainScreen();
        }); 
}; 

addRole = () => {  
    connection.findAllRoles().then(([rows])=>{
        let departments = rows; 
        const departmentChoices = departments.map(({ id, name })=> ({
            name:name, 
            value:id, 
        }))
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'role_name',
            message: "What is the name of the role?",
            validate: answer => {
                if (answer !== "") {
                    return true; 
                } 
                return "Please enter at least one character."
            } 
        }, 
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of the role?",
            validate: answer => {
                if (answer !== "") {
                    return true; 
                } 
                return "Please enter at least one number."
            }
        }, 
        {
            type: 'list',
            name: 'department',
            message: "What department does the role belong to?",
            //Gives a list of all of the deparments from the db  
            choices: departmentChoices
        }
    ]).then((answers) => {
        //adds new role to the database 
        generateRole(answers);  
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    });  
    }); 
}; 

viewAllDepartments = () => {
    //this displays the department table 
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
        console.error(err); 
        }
        var allDepartments = results; 
        //this gives some white space so the table displays better 
        console.log(" "); 
        console.table('Departments', allDepartments.slice(0)); 
        //calls the main screen again 
        mainScreen();
    }); 
}; 

addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department_name',
            message: "What is the name of the department?",
            validate: answer => {
                if (answer !== "") {
                    return true; 
                } 
                return "Please enter at least one character."
            } 
        }
    ]).then((answers) => {
        //adds new department to database 
        generateDepartment(answers);  
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    })  
}; 

//initializes the app 
mainScreen(); 
