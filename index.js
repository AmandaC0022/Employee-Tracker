const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const db = require('./server'); 
const generateDepartment = require('./utils/generateDepartment'); 
const generateEmployee = require('./utils/generateEmployee'); 
const generateRole = require('./utils/generateRole'); 
const connection = require('./db/query'); 


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
        //adds new employee to the database file   
        // fs.writeFile('./db/employees.sql', generatedb(answers), () => {})
        console.log(`Thank you. ${answers.employees_name}'s role has been updated.`);
        mainScreen(); 
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    }) 
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
            choices: ['Sale', 'Fiance', 'Development', 'Marketing']
        }
    ]).then((answers) => {
        //adds new role to the database 
        generateRole(answers);  
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    }) 
}; 

//this will return all of the department's names
// getDepartment = () => {
//     db.query("SELECT name FROM department"), function (err, res){
//         if(err) throw err; 
//         console.log(res); 
//     }
// }

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
        db.query("INSERT INTO department SET ?", {
            name:answers.department_name
        }, function (err, result) {
            if (err) throw err; 
        });  
        console.log("Thank you. The new department has been added to the database.");
        mainScreen();
    }).catch((error) => {
        if (error) {
            console.error(error.message); 
        }
    })  
}; 

//initializes the app 
mainScreen(); 
