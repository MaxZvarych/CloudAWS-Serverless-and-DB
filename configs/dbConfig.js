const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "****",
  database: "masyanya-vpc-db",
});

module.exports = pool;
