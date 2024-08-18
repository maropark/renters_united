const express = require("express");
const router = express.Router();
const coSignerModel = require("../models/coSignerModel");
const authMiddleware = require("../middleware/authMiddleware");

// Add a co-signer
router.post("/add", authMiddleware.authenticate, async (req, res) => {
  const userId = req.user.id; // Assumes user ID is attached to req.user by authMiddleware
  const coSignerData = req.body;

  try {
    const id = await coSignerModel.addCoSigner(userId, coSignerData);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get co-signers for a user
router.get("/", authMiddleware.authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const coSigners = await coSignerModel.getCoSigners(userId);
    res.json(coSigners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
