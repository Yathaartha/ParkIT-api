const dotenv = require("dotenv");

dotenv.config();

const Pool = require("pg").Pool;
var config = {
  user: "admin",
  host: "localhost",
  database: "parkit",
  password: "secret",
  port: 5432,
};

const pool = new Pool(config);
module.exports = pool;
