const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Determine the database path dynamically
const dbPath =
  process.env.NODE_ENV === "production"
    ? path.resolve("database/reviews.db")
    : path.join(__dirname, "reviews.db");

console.log(`Using database at: ${dbPath}`);

// Connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create the reviews table if it doesn't exist
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

// Gracefully close the database connection on termination signals
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database connection:", err.message);
    } else {
      console.log("Closed the database connection.");
    }
    process.exit(0);
  });
});

module.exports = db;
