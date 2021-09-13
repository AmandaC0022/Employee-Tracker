const mysql = require('mysql2');

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
    console.log(results);
});

