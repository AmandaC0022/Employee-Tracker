const db = require("../server");

const updateRole = (answers) => {
    db.query(`UPDATE employees SET role_id = ${answers.employees_role} WHERE id = ${answers.employees_name}`)
    //find employee id and role id and edit that value
    console.log("This employee's role has been updated.");
    mainScreen(); 
}; 

module.exports = updateRole; 