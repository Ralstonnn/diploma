const mysql = require("mysql");

const con = mysql.createConnection({
  user: "engsite",
  password: "0000",
  host: "localhost",
  database: "engsitedb",
  multipleStatements: true,
});

module.exports = {
  con,
};
