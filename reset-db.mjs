import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const { Pool } = pg

async function resetDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    console.log('🔄 Connecting to database...')
    const client = await pool.connect()
    
    console.log('🗑️ Dropping all tables and types...')
    
    // Drop all tables
    await client.query(`
      DROP SCHEMA IF EXISTS public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO neondb_owner;
      GRANT ALL ON SCHEMA public TO public;
    `)
    
    console.log('✅ Database reset successfully!')
    console.log('👉 Now run: npm run dev')
    
    client.release()
    await pool.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Reset failed:', error)
    await pool.end()
    process.exit(1)
  }
}

resetDatabase()
