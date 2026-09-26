require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL must be set before initializing the database.');
  process.exit(1);
}

const client = new Client({ connectionString: process.env.DATABASE_URL });

async function initializeDatabase() {
  try {
    await client.connect();
    const schema = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
    await client.query('BEGIN');
    await client.query(schema);
    await client.query(`
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS profile_picture VARCHAR(255),
        ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
        ADD COLUMN IF NOT EXISTS address TEXT,
        ADD COLUMN IF NOT EXISTS bio TEXT,
        ADD COLUMN IF NOT EXISTS date_of_birth DATE;
      ALTER TABLE lessons
        ADD COLUMN IF NOT EXISTS content TEXT,
        ADD COLUMN IF NOT EXISTS example_code TEXT;
    `);

    const categories = await client.query('SELECT COUNT(*)::int AS count FROM learning_categories');
    if (categories.rows[0].count === 0) {
      const seed = fs.readFileSync(path.join(__dirname, '../database/seed.sql'), 'utf8');
      await client.query(seed);
    }

    await client.query('COMMIT');
    console.log('Database schema is ready.');
  } catch (err) {
    try { await client.query('ROLLBACK'); } catch (_) {}
    console.error('Database initialization failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

initializeDatabase();
