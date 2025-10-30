# 🚀 Quick Setup Guide

## Step 1: Database Setup (REQUIRED)

### Option A: Run All Migrations at Once (Recommended)

1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/qcfwborimqejlnkjyjzi/sql
2. Copy the entire contents of: `supabase/migrations/000_all_migrations.sql`
3. Paste into the SQL Editor
4. Click "Run" ▶️
5. Done! ✅

### Option B: Run Individual Migrations

Run each file in order in the SQL Editor:
1. `001_create_dishes_table.sql`
2. `002_create_reservations_table.sql`
3. `003_create_availability_function.sql`
4. `004_seed_menu_data.sql`

## Step 2: Start the App

```bash
npm run dev
```

Open http://localhost:3000

## Step 3: Test the Features

### Test Menu Display
- Scroll down to see the menu
- Click category filters (Antipasti, Primi, Secondi, Dolci)
- All 17 dishes should appear

### Test AI Chat
1. Click the chat button (bottom right, red circle)
2. Say: "Show me the menu"
3. Say: "I want to make a reservation for tomorrow at 8pm for 2 people"
4. Provide your name and phone when asked
5. Reservation should be created! ✅

### Test Availability
- Say: "Is there availability for Friday at 7:30pm for 4 people?"
- AI will check real-time availability

## Troubleshooting

### "No dishes found"
→ Run the database migrations (Step 1)

### Chat not working
→ Check console for errors
→ Verify OpenRouter API key in `.env.local`

### Build errors
→ Run `npm install` again
→ Run `npm run typecheck`

## What You Get

- ✨ **Beautiful Italian Design** - Premium UI with gold accents
- 🤖 **AI Concierge** - Claude 3.5 Haiku powered chat
- 📋 **Full Menu** - 17 authentic Italian dishes
- 📅 **Smart Reservations** - Real-time availability checking
- 📱 **Responsive** - Works on mobile, tablet, desktop

---

**Need help?** Check README.md for detailed documentation.
