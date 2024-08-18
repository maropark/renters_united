const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/email");

const router = express.Router();

// Environment variables for secret keys
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Make sure to set this in your environment
const EMAIL_SECRET = process.env.EMAIL_SECRET || "your_email_secret"; // For future email-related secrets

// Register a new user
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, hashedPassword]
    );

    // Send verification email
    const token = jwt.sign({ userId: newUser.rows[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    sendVerificationEmail(newUser.rows[0], token);

    // Respond with the newly created user
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and assign a JWT
    const token = jwt.sign({ userId: user.rows[0].id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify Email
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  try {
    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Update the user's verified status
    await pool.query("UPDATE users SET is_verified = true WHERE id = $1", [
      decoded.userId,
    ]);

    res.send("Email verified successfully!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Invalid token");
  }
});

module.exports = router;
