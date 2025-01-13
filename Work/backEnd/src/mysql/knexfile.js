require("dotenv").config(); // Load environment variables
const knex = require("knex");

const knexConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root@1234",
    database: process.env.DB_NAME || "task",
  },
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

const db = knex(knexConfig);

module.exports = db;
