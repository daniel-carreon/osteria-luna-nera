# 🍝 Osteria Luna Nera

Fine Italian dining restaurant website with AI-powered reservation system.

## Features

- 🎨 **Elegant Italian Design** - Premium UI with gold, burgundy, and cream color palette
- 🤖 **AI Chat Assistant** - Bilingual Italian/English concierge powered by Claude 3.5 Haiku
- 📋 **Interactive Menu** - Filterable menu with beautiful imagery
- 📅 **Smart Reservations** - Real-time availability checking and booking
- ⚡ **Next.js 16** - Latest features with Turbopack and React Compiler
- 💾 **Supabase Backend** - PostgreSQL database with RLS policies

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **AI**: Vercel AI SDK, OpenRouter (Claude 3.5 Haiku)
- **Database**: Supabase PostgreSQL
- **UI**: Lucide Icons, Framer Motion, React Markdown

## Setup Instructions

### 1. Prerequisites

- Node.js 20.9+
- Supabase account
- OpenRouter API key

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Already configured in `.env.local` with your credentials.

### 4. Database Setup

**Option A: Supabase SQL Editor (Recommended)**

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to SQL Editor
3. Run each migration file in order:
   - `supabase/migrations/001_create_dishes_table.sql`
   - `supabase/migrations/002_create_reservations_table.sql`
   - `supabase/migrations/003_create_availability_function.sql`
   - `supabase/migrations/004_seed_menu_data.sql`

**Option B: Supabase CLI**

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref qcfwborimqejlnkjyjzi

# Run migrations
supabase db push
```

### 5. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js 16 App Router
│   ├── api/chat/          # AI chat endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── features/              # Feature-first architecture
│   ├── chat/             # Chat feature (components, tools, types)
│   └── menu/             # Menu feature
├── shared/               # Shared utilities
│   ├── components/       # Reusable UI components
│   ├── lib/             # Supabase & OpenRouter clients
│   ├── types/           # TypeScript types
│   └── utils/           # Helper functions
└── supabase/            # Database migrations
```

## Key Files

- `app/api/chat/route.ts` - AI chat API with tool calling
- `features/chat/system-prompt.ts` - Bilingual AI persona
- `features/chat/tools/` - AI tools (menu, availability, reservations)
- `features/chat/components/ChatWidget.tsx` - Floating chat UI
- `shared/lib/supabase.ts` - Database client
- `tailwind.config.ts` - Italian color palette

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Features to Test

### 1. Menu Display
- ✅ View all dishes
- ✅ Filter by category (antipasti, primi, secondi, dolci, bevande)
- ✅ Responsive design

### 2. AI Chat Assistant
- ✅ Ask about menu items
- ✅ Check availability for specific dates/times
- ✅ Make reservations
- ✅ Bilingual responses (English/Italian)

### 3. Reservation Flow
1. Open chat widget (bottom right)
2. Say "I'd like to make a reservation"
3. Provide: date, time, number of guests, name, phone
4. AI checks availability and creates booking
5. Confirmation with reservation ID

## Database Schema

### Tables

**dishes**
- Menu items with Italian names, descriptions, prices, images
- Categories: antipasti, primi, secondi, dolci, bevande
- Dietary tags support

**reservations**
- Customer information (name, phone, email)
- Date, time, party size
- Status tracking (pending, confirmed, seated, etc.)

### Functions

**check_table_availability(date, time)**
- Returns number of available tables (max 12)
- Accounts for existing reservations

## AI Tools

1. **get_menu** - Fetch restaurant menu (filterable)
2. **check_availability** - Check table availability
3. **create_reservation** - Create new booking

## Design Philosophy

- **Italian elegance** - Black, gold, burgundy color scheme
- **Sophistication** - Playfair Display serif font for headers
- **Minimalism** - Generous whitespace, clean lines
- **Glassmorphism** - Chat widget with backdrop blur
- **Premium imagery** - Unsplash food photography

## Troubleshooting

### Port already in use
The dev server auto-detects ports 3000-3006. If all are busy:
```bash
lsof -i :3000
kill -9 <PID>
```

### Database connection errors
- Verify Supabase project ref in `.env.local`
- Check that migrations have been run
- Ensure RLS policies are enabled

### AI chat not responding
- Verify OpenRouter API key in `.env.local`
- Check browser console for errors
- Ensure `/api/chat` route is accessible

## License

Proprietary - Osteria Luna Nera © 2025

---

**Buon Appetito! 🍷**
