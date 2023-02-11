const mysql = require("mysql");
require('dotenv').config();

function connection() {
  const mysqli = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
  });
  mysqli.connect((err) => {
    if (err) console.log(err);
    else console.log("connected to sql server");
  });
  return mysqli;
}
mysqli = connection()
module.exports = mysqli

