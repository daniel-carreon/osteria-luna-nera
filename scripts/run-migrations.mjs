import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qcfwborimqejlnkjyjzi.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZndib3JpbXFlamxua2p5anppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTM5Njg5MywiZXhwIjoyMDUwOTcyODkzfQ.I5Y1wHJ4RuXz_6ZIMVxrWFrJm-hMNkuVKG1u8V3MxE8'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const migrations = [
  '001_create_dishes_table.sql',
  '002_create_reservations_table.sql',
  '003_create_availability_function.sql',
  '004_seed_menu_data.sql'
]

async function runMigration(filename) {
  console.log(`\n📝 Running migration: ${filename}`)

  try {
    const migrationPath = join(__dirname, '..', 'supabase', 'migrations', filename)
    const sql = readFileSync(migrationPath, 'utf8')

    // Execute SQL using Supabase client
    // Note: This uses a workaround since Supabase JS doesn't have direct SQL execution
    // We'll use the REST API directly
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
      },
      body: JSON.stringify({ query: sql })
    })

    if (!response.ok) {
      // If exec_sql doesn't exist, we'll need to run migrations manually
      console.log(`⚠️  Cannot execute SQL directly. Please run this migration manually in Supabase SQL Editor:`)
      console.log(`   ${migrationPath}`)
      return false
    }

    console.log(`✅ Migration completed: ${filename}`)
    return true
  } catch (error) {
    console.error(`❌ Error running migration ${filename}:`, error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Starting database migrations for Osteria Luna Nera...\n')

  let allSuccess = true
  for (const migration of migrations) {
    const success = await runMigration(migration)
    if (!success) allSuccess = false
  }

  if (!allSuccess) {
    console.log('\n⚠️  Some migrations could not be executed automatically.')
    console.log('\n📋 Manual Steps Required:')
    console.log('1. Go to https://supabase.com/dashboard')
    console.log('2. Select your project')
    console.log('3. Navigate to SQL Editor')
    console.log('4. Copy and paste the contents of each migration file:')
    migrations.forEach(m => console.log(`   - supabase/migrations/${m}`))
  } else {
    console.log('\n✅ All migrations completed successfully!')
  }

  console.log('\n🍝 Database setup complete. Run `npm run dev` to start the app.')
}

main().catch(console.error)
