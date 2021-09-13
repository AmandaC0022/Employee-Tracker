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

// Shows the Roles table from seeds file 
//NOTE: you can filter what exactly is shown by changing * to title, salary, etc. 
// db.query('SELECT * FROM role', function (err, results) {
//   if (err) {
//     console.error(err); 
//   }
//   var allRoles = results; 
//   console.table('Roles', allRoles.slice(0)); 
// });

module.exports = db; 