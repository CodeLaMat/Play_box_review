const express = require("express");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes);

// Health Check Route
app.get("/api", (req, res) => {
  res.send("API is working!");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
