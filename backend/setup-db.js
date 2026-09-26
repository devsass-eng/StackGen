const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Helper to pause execution briefly
const sleep = ms => new Promise(res => setTimeout(res, ms));

async function setupDatabase() {
  // 1. Connect to the default 'postgres' database to create the new database
  // We parse the credentials out of your .env file
  const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/fullstack_tracker';
  const defaultUrl = dbUrl.replace('fullstack_tracker', 'postgres');
  
  const defaultClient = new Client({
    connectionString: defaultUrl
  });

  try {
    console.log('Connecting to default postgres database...');
    await defaultClient.connect();
    
    console.log('Creating fullstack_tracker database if it doesn\'t exist...');
    try {
      await defaultClient.query('CREATE DATABASE fullstack_tracker');
      console.log('Database created successfully.');
    } catch (e) {
      if (e.code === '42P04') {
        console.log('Database fullstack_tracker already exists (this is fine).');
      } else {
        throw e;
      }
    }
  } catch (err) {
    console.error('Error connecting to postgres:', err.message);
    console.error('Did you change your postgres password? If so, update the connectionString in setup-db.js!');
    process.exit(1);
  } finally {
    await defaultClient.end();
  }

  // Brief pause to ensure the DB is fully ready to accept connections
  await sleep(1000);

  // 2. Connect to the newly created database and run the schema/seed
  const appClient = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/fullstack_tracker'
  });

  try {
    console.log('Connecting to fullstack_tracker database...');
    await appClient.connect();

    // Read and execute schema
    console.log('Applying database schema...');
    const schemaSql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf-8');
    await appClient.query(schemaSql);
    
    // Read and execute seed
    console.log('Applying initial curriculum data (seeding)...');
    const seedSql = fs.readFileSync(path.join(__dirname, '../database/seed.sql'), 'utf-8');
    await appClient.query(seedSql);

    console.log('✅ Database setup is 100% complete!');
    console.log('You can now start your server by running: node backend/server.js');
  } catch (err) {
    console.error('Error setting up tables:', err.message);
  } finally {
    await appClient.end();
  }
}

setupDatabase();
