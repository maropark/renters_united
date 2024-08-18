require("dotenv").config();
const express = require("express");
const pool = require("./db"); // Correct import
const initializeDatabase = require("./models/userModel"); // Import the function
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const coSignerRoutes = require("./routes/coSignerRoutes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Initialize the database (create tables if not present)
initializeDatabase();

app.use("/api", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/co-signers", coSignerRoutes);

// Start the server and listen on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export the app for potential testing or future use
