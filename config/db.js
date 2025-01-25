const mysql2 = require("mysql2");
const db = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});
db.connect((err) => {
  if (err) {
    console.log("disconnected");
    process.exit(1);
  }
  console.log("mysql connected");
});
module.exports = db;
