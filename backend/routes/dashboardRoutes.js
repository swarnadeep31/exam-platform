import express from "express";
import Attempt from "../models/Attempt.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const attempts = await Attempt.find();

    if (attempts.length === 0) {
      return res.json({
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        bestTopic: "N/A",
      });
    }

    const totalAttempts = attempts.length;

    const totalScore = attempts.reduce(
      (sum, a) => sum + a.score,
      0
    );

    const averageScore = (
      totalScore / totalAttempts
    ).toFixed(2);

    const highestScore = Math.max(
      ...attempts.map((a) => a.score)
    );

    // Best topic calculation
    const topicMap = {};
    attempts.forEach((a) => {
      if (!topicMap[a.topic]) {
        topicMap[a.topic] = { score: 0, count: 0 };
      }
      topicMap[a.topic].score += a.score;
      topicMap[a.topic].count += 1;
    });

    let bestTopic = "N/A";
    let bestAvg = 0;

    for (const topic in topicMap) {
      const avg =
        topicMap[topic].score / topicMap[topic].count;
      if (avg > bestAvg) {
        bestAvg = avg;
        bestTopic = topic;
      }
    }

    res.json({
      totalAttempts,
      averageScore,
      highestScore,
      bestTopic,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
