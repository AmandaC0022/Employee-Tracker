const db = require('../server'); 

const generateDepartment = (answers) => {
    db.query("INSERT INTO department SET ?", {
        name:answers.department_name, 
    }, function (err){
        if(err) throw err; 
        console.log('\n', '\n', `${answers.department_name} has been added to the database.`, '\n');
        mainScreen();
    });
}; 

module.exports = generateDepartment; 
