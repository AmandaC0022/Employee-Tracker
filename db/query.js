const connection = require('../server'); 

class DB {
    constructor(connection) {
        this.connection = connection; 
    }
    findAllRoles(){
        return this.connection.promise().query(
            "SELECT title, id FROM role"
        )
    }
    findAllEmployees(){
        return this.connection.promise().query(
            "SELECT first_name, last_name, id FROM employees"
        )
    }
    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT * FROM departments"
        )
    }
}

module.exports = new DB(connection); 