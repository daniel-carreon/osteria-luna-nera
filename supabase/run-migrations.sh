#!/bin/bash

# Run all migrations in order
echo "Running database migrations..."

# Get Supabase connection string from environment
SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
SUPABASE_KEY=${SUPABASE_SERVICE_ROLE_KEY}

# For now, these migrations should be run manually in Supabase SQL Editor
# or using the Supabase CLI

echo "To run these migrations:"
echo "1. Go to your Supabase project SQL Editor"
echo "2. Copy and paste the contents of each migration file in order:"
echo "   - 001_create_dishes_table.sql"
echo "   - 002_create_reservations_table.sql"
echo "   - 003_create_availability_function.sql"
echo "   - 004_seed_menu_data.sql"
echo ""
echo "Or use Supabase CLI:"
echo "   supabase db push"
