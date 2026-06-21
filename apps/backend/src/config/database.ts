import { pool } from '../db/index.js';

export async function connectDatabase() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ PostgreSQL connected successfully');
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL:', error);
    process.exit(1);
  }
}

export async function disconnectDatabase() {
  await pool.end();
}
