// backend/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { sendVerificationEmail } = require("../utils/emailUtils");

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(20).toString("hex"); // Add token generation here
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password_hash, verification_token) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [first_name, last_name, email, hashedPassword, token]
    );
    await sendVerificationEmail(email, token);
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET); // Use env variable for secret
      res.json({ token });
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE verification_token = $1",
      [token]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      await pool.query(
        "UPDATE users SET email_verified = TRUE, verification_token = NULL WHERE id = $1",
        [user.id]
      );
      res.send("Email verified successfully");
    } else {
      res.status(400).send("Invalid or expired token");
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal Server Error");
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const token = crypto.randomBytes(20).toString("hex");
    const result = await pool.query(
      "UPDATE users SET reset_token = $1 WHERE email = $2 RETURNING id",
      [token, email]
    );
    if (result.rows.length > 0) {
      await sendVerificationEmail(email, token); // Modify to send reset email
      res.send("Password reset link sent");
    } else {
      res.status(404).send("Email not found");
    }
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).send("Internal Server Error");
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { new_password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const result = await pool.query(
      "SELECT * FROM users WHERE reset_token = $1",
      [token]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      await pool.query(
        "UPDATE users SET password_hash = $1, reset_token = NULL WHERE id = $2",
        [hashedPassword, user.id]
      );
      res.send("Password has been reset");
    } else {
      res.status(400).send("Invalid or expired token");
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
};
