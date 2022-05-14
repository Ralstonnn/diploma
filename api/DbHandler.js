// const mariadb = require("mariadb");
const mysql = require("mysql");

const con = mysql.createConnection({
  user: "engsite",
  password: "0000",
  host: "localhost",
  database: "engsitedb",
});

// async function query(str) {
//   try {
//     const result = con.query(str, (err, res) => {
//       if (err) throw err;
//       console.log("hit");
//       return JSON.parse(JSON.stringify(res));
//     });
//     // console.log(result);
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  con,
};
