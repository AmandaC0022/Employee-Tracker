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

let sql = `SELECT * FROM department`; 

// Query database
db.query(sql, function (err, results) {
  if (err) {
    console.error(err); 
  }
  console.table([
    {
      department:results[0].name
    },
    {
      department:results[1].name
    },
    {
      department:results[2].name
    }, 
    {
      department:results[3].name
    }
  ])
}); 
  