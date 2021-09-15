const db = require('../server'); 

const generateEmployee = (answers) => {
    //adds new employee to employee database 
    db.query("INSERT INTO employees SET ?", {
        first_name:answers.first_name, 
        last_name:answers.last_name
    }, function (err){
        if(err) throw err; 
        console.log(`${answers.first_name} ${answers.last_name} has been added to the database.`);
    });
}; 

module.exports = generateEmployee; 

//how do I make the answers.role which is a string match the role id which is a number? 