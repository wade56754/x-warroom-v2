import postgres from 'postgres';

const connStr = process.env.SUPABASE_DB_URL;
if (!connStr) throw new Error('SUPABASE_DB_URL is not set');

// PgBouncer transaction mode: prepare=false to avoid prepared statement issues
export const sql = postgres(connStr, {
  max: 5,
  prepare: false,
  ssl: 'require',
});
