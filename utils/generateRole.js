const db = require('../server'); 

const generateRole = (answers) => {
    //adds new role to role database 
    db.query("INSERT INTO role SET ?", {
        title: answers.role_name, 
        salary: answers.salary, 
        department_id: answers.department, 
    }, function (err){
        if(err) throw err; 
        console.log('\n', `${answers.role_name} has been added to the database.`, '\n');
        mainScreen(); 
    }); 
}; 

module.exports = generateRole; 