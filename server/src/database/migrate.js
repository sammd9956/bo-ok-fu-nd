import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../../config/db.js";

const __filename = fileURLToPath(import.meta.url);
// console.log("pathhhhhhh",path);

const __dirname = path.dirname(__filename);

export const runMigrations = async () => {
  try {
    const migrationPath = path.join(__dirname, "migrations");

    console.log("Running migrations...");

    // ensure migration table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const files = fs
      .readdirSync(migrationPath)
      .filter(f => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const [rows] = await pool.query(
        "SELECT name FROM migrations WHERE name = ?",
        [file]
      );

      // skip if already executed
      if (rows.length > 0) {
        console.log(`Skipped: ${file}`);
        continue;
      }

      const sql = fs.readFileSync(
        path.join(migrationPath, file),
        "utf8"
      );

      try {
        await pool.query(sql);

        await pool.query(
          "INSERT INTO migrations (name) VALUES (?)",
          [file]
        );

        console.log(`Migrated: ${file}`);
      } catch (err) {
        console.error(`Failed: ${file}`);
        console.error(err.message);
        process.exit(1);
      }
    }

    console.log("All migrations completed!");
  } catch (err) {
    console.error("Migration System Error:", err);
    process.exit(1);
  }
};