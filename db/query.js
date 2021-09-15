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
    
}

module.exports = new DB(connection); 