const mysql = require("mysql");
const pool = mysql.createPool({
  host: "mysql-bus-database-opened.cahh4sebpiaj.us-east-2.rds.amazonaws.com",
  user: "root",
  password: "rootroot",
  database: "masyanya-vpc-db",
});

module.exports = pool;
