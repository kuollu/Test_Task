const express = require("express")

const app = express()

const urlencodedParser = express.urlencoded({extended: false})

app.get("/", function (request, response) {
   response.sendFile(__dirname + "/index.html")
});
app.post("/", urlencodedParser, function (request, response) {
   if(!request.body) return response.sendStatus(400)


   const mysql = require("mysql2")
   const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   database: "usersdata",
   password: "1111"
   });

   const sql = `SELECT * FROM users WHERE user=? AND pass=?`
   const filter = [request.body.user, request.body.pass]

   connection.query(sql, filter, function(err, results) {
      if (err) console.log(err)
      if (results.length != 0) {
      response.send(`${results[0].user} - ${results[0].info}`)
}
      else {
      response.sendFile(__dirname + "/index_ERROR.html")
}
});

connection.end()

});

app.listen(3000, ()=>console.log("Сервер запущен..."))