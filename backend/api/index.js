const express = require("express");
const cors = require("cors");
const reviewRoutes = require("../routes/reviewRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes);

// Health Check
app.get("/api", (req, res) => {
  res.send("API is working!");
});

// Start server in local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for serverless environments
module.exports = app;
