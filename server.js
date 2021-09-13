const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'employees_db',
  },
  console.log('Connected to the employees_db database.')
);

// Shows the Department table from seeds file 
db.query('SELECT * FROM department', function (err, results) {
  if (err) {
    console.error(err); 
  }
  var allDepartments = results; 
  console.table('Departments', allDepartments.slice(0)); 
}); 
  
// module.exports = allDepartments; 