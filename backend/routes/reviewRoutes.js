const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST: Submit a review and send email
router.post("/", (req, res) => {
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

  // Sending email
  const transporter = nodemailer.createTransport({
    service: "Mail.ru", // Replace with your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL || "ilgar_guliyev2003@mail.ru",
    subject: "New Review Submission",
    text: `
      New review submitted:
      Branch: ${staff}
      Shisha Quality: ${shishaQuality}
      Staff Quality: ${staffQuality}
      Venue Quality: ${venueQuality}
      Feedback: ${feedback || "No feedback provided."}
      Visit Date: ${visitDate}
    `,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error("Email error:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to send email notification." });
    }

    res.json({ message: "Review submitted and email sent successfully!" });
  });
});

module.exports = router;
