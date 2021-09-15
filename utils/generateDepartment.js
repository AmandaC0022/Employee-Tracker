const generateDepartment = (answers) => {
    db.query("INSERT INTO department SET ?", {
        name:answers.department_name, 
    }, function (err){
        if(err) throw err; 
        console.log(`${answers.department_name} has been added to the database.`);
    });
}; 

module.exports = generateDepartment; 
