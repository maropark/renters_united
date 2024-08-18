// backend/controllers/userController.js
const pool = require("../db");

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, first_name, last_name, email, created_at, updated_at FROM users WHERE id = $1",
      [id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );
    if (result.rows.length > 0) {
      res.send("User account deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUser,
  deleteUser,
};
