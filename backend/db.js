const { Pool } = require("pg");

// Configure the database connection pool
const pool = new Pool({
  user: "app_user",
  host: "localhost",
  database: "renters_united",
  password: "laBamssi2024Renters",
  port: 5432,
});

// Export the pool to be used in other modules
module.exports = pool;
