const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function updateDatabase() {
  const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/fullstack_tracker';
  
  const client = new Client({
    connectionString: dbUrl
  });

  try {
    await client.connect();
    console.log('Adding profile_picture column to users table...');
    await client.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_picture VARCHAR(255);');
    console.log('Successfully updated database schema.');
  } catch (err) {
    console.error('Error updating database:', err.message);
  } finally {
    await client.end();
  }
}

updateDatabase();
