const mysql = require("mysql");

const con = mysql.createConnection({
  user: "engsite",
  password: "0000",
  host: "localhost",
  database: "engsitedb",
});

module.exports = {
  con,
};
