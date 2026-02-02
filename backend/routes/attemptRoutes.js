import express from "express";
import Attempt from "../models/Attempt.js";

const router = express.Router();

// Save attempt
router.post("/", async (req, res) => {
  try {
    const attempt = new Attempt(req.body);
    await attempt.save();
    res.status(201).json(attempt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all attempts (admin/debug)
router.get("/", async (req, res) => {
  const { userId } = req.query;

  const filter = userId ? { userId } : {};
  const attempts = await Attempt.find(filter).sort({ createdAt: -1 });

  res.json(attempts);
});


export default router;
