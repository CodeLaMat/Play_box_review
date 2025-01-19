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
  db.run(
    sql,
    [staff, shishaQuality, staffQuality, venueQuality, feedback, visitDate],
    function (err) {
      if (err) {
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
        to: "ilgar_guliyev2003@mail.ru",
        subject: "New Review",
        text: `Branch: ${staff}\nShisha Quality: ${shishaQuality}\nFeedback: ${feedback}`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to send email" });
        }

        res.json({ message: "Review submitted successfully!" });
      });
    }
  );
});

module.exports = router;
