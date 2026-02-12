const express = require("express");
const router = express.Router();

// Test API
router.post("/generate", (req, res) => {
  const data = req.body;

  res.json({
    message: "Roadmap received successfully ✅",
    input: data,
  });
});

module.exports = router;
