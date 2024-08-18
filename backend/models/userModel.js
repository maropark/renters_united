const pool = require("../db"); // Import the pool from db.js
console.log("Pool object:", pool); // Add this line to debug

// SQL to check if the table exists and create if not
const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    verification_token VARCHAR,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );
`;

// Function to check and create the table
const initializeDatabase = async () => {
  try {
    console.log("Running query with pool:", pool); // Add this line to debug

    await pool.query(createUserTable);
    console.log("User table is ready");
  } catch (err) {
    console.error("Failed to initialize database", err);
  }
};

// Export the initializeDatabase function for use in app.js
module.exports = initializeDatabase;
