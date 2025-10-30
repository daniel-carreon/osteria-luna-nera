-- Create dishes table
CREATE TABLE IF NOT EXISTS dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_italian TEXT,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('antipasti', 'primi', 'secondi', 'dolci', 'bevande')),
  image_url TEXT,
  dietary_tags TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_dishes_category ON dishes(category);
CREATE INDEX IF NOT EXISTS idx_dishes_available ON dishes(available) WHERE available = true;

-- Enable Row Level Security
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to available dishes
CREATE POLICY "Public can view available dishes"
  ON dishes FOR SELECT
  USING (available = true);

-- Policy: Allow all operations for service role
CREATE POLICY "Service role has full access to dishes"
  ON dishes FOR ALL
  USING (true)
  WITH CHECK (true);
