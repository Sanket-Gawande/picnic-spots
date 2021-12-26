const mysql = require('mysql')
function conn(){

    const mysqli = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: '',
        database: 'places-app'
    })
    mysqli.connect(err => {
        if (err) console.log(err)
        else console.log("Connected to sql server")
    })
}
 // conn();
module.exports = conn 