const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const roadmapRoutes = require("./routes/roadmap");
app.use("/api/roadmap", roadmapRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("PrepPilot Backend Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
