const db = require('../server'); 

const generateRole = (answers) => {
    //adds new role to role database 
    db.query("INSERT INTO role SET ?", {
        title: answers.role_name, 
        salary: answers.salary
    }, function (err){
        if(err) throw err; 
        console.log(`
${answers.role_name} has been added to the database.`);
        mainScreen(); 
    }); 
}; 

module.exports = generateRole; 