const generateEmployee = (answers) => {
    return `INSERT INTO employees (first_name, last_name, role_id)
    VALUES
        ("${answers.first_name}", "${answers.last_name}", "${answers.role}")`
}; 

module.exports = generateEmployee; 

//how do I make the answers.role which is a string match the role id which is a number? 