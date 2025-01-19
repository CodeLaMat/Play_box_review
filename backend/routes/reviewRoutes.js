const express = require("express");
const router = express.Router();
const db = require("../database/db");
const nodemailer = require("nodemailer");

// POST: Submit a review
router.post("/", (req, res) => {
  const {
    staff,
    shishaQuality,
    staffQuality,
    venueQuality,
    feedback,
    visitDate,
  } = req.body;

  const sql = `
    INSERT INTO reviews (branch, shisha_quality, staff_quality, venue_quality, feedback, visit_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  console.log("Inserting review into the database...");

  db.run(
    sql,
    [staff, shishaQuality, staffQuality, venueQuality, feedback, visitDate],
    function (err) {
      console.log("Database query finished.");

      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Failed to save review" });
      }

      // Sending email
      const transporter = nodemailer.createTransport({
        service: "Mail.ru",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL || "ilgar_guliyev2003@mail.ru", // Use a dynamic receiver if defined
        subject: "New Review Submission",
        text: `
          Branch: ${staff}
          Shisha Quality: ${shishaQuality}
          Staff Quality: ${staffQuality}
          Venue Quality: ${venueQuality}
          Feedback: ${feedback}
          Visit Date: ${visitDate}
        `,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error("Email error:", err.message);
          return res
            .status(500)
            .json({ error: "Failed to send email notification" });
        }

        res.json({ message: "Review submitted successfully!" });
      });
    }
  );
});

module.exports = router;
