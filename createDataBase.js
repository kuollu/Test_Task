const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "usersdata",
  password: "1111"
});

const sql = `SELECT * FROM users`

connection.query(sql, function(err, results) {
  if(err) console.log(err)

});

connection.end();