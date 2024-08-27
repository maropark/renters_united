// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/user/:id", authMiddleware.authenticate, userController.getUser);

router.delete(
  "/user/:id",
  authMiddleware.authenticate,
  userController.deleteUser
);

module.exports = router;
