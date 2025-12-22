import pg from 'pg'
import { config } from 'dotenv'
import { readFileSync } from 'fs'

config({ path: '.env.local' })
config({ path: '.env' })

const { Pool } = pg

async function applyMigration() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    console.log('🔄 Connecting to database...')
    const client = await pool.connect()
    
    console.log('🗑️ Dropping old tables...')
    await client.query('DROP SCHEMA IF EXISTS public CASCADE')
    await client.query('CREATE SCHEMA public')
    await client.query('GRANT ALL ON SCHEMA public TO neondb_owner')
    await client.query('GRANT ALL ON SCHEMA public TO public')
    
    console.log('📝 Reading migration file...')
    const migration = await import('./migrations/20251220_195501.ts')
    
    console.log('⚙️ Running migration...')
    await migration.up({ db: client, payload: null, req: null })
    
    console.log('✅ Migration completed successfully!')
    
    client.release()
    await pool.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    await pool.end()
    process.exit(1)
  }
}

applyMigration()
