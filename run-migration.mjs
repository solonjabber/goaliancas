import { config } from 'dotenv'
import { getPayload } from 'payload'
import payloadConfig from './payload.config.ts'

config({ path: '.env.local' })
config({ path: '.env' })

async function runMigration() {
  try {
    console.log('Connecting to Payload...')
    const payload = await getPayload({ config: payloadConfig })
    
    console.log('Running migrations...')
    await payload.db.migrate()
    
    console.log('✅ Migrations completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
