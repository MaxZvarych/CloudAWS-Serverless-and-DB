const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Max0993319943",
  database: "masyanya-vpc-db",
});

module.exports = pool;
