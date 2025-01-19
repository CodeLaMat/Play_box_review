const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath =
  process.env.NODE_ENV === "production"
    ? "./database/reviews.db"
    : path.join(__dirname, "reviews.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    branch TEXT NOT NULL,
    shisha_quality INTEGER NOT NULL,
    staff_quality INTEGER NOT NULL,
    venue_quality INTEGER NOT NULL,
    feedback TEXT,
    visit_date DATE NOT NULL
  )
`);

module.exports = db;
