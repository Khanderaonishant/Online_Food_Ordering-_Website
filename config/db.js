const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",       // change if needed
  password: "",       // your MySQL password
  database: "food_ordering"
});
connection.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});
module.exports = connection;
