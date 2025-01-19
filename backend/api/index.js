const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST: Submit a review and send email
app.post("/api/reviews", async (req, res) => {
  const {
    staff,
    shishaQuality,
    staffQuality,
    venueQuality,
    feedback,
    visitDate,
  } = req.body;

  // Validate input
  if (
    !staff ||
    !shishaQuality ||
    !staffQuality ||
    !venueQuality ||
    !visitDate
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Mail.ru",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL || "default@example.com",
      subject: "New Review Submission",
      text: `
        New review submitted:
        Branch: ${staff}
        Shisha Quality: ${shishaQuality}
        Staff Quality: ${staffQuality}
        Venue Quality: ${venueQuality}
        Feedback: ${feedback}
        Visit Date: ${visitDate}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.json({ message: "Review submitted and email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Health Check
app.get("/api", (req, res) => {
  res.send("API is working!");
});

// Local development server
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel deployment
module.exports = app;
