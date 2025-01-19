const express = require("express");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

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
app.listen(PORT, () => {
  console.log(
    `Server is running on ${
      process.env.NODE_ENV === "production"
        ? "Vercel deployment domain"
        : `http://localhost:${PORT}`
    }`
  );
});
