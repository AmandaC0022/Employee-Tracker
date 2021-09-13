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

module.exports = db; 