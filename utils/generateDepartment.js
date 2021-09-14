const generateDepartment = (answers) => {
    return `INSERT INTO department (name)
    VALUES
        ("${answers.department_name}")`
}; 

module.exports = generateDepartment; 
