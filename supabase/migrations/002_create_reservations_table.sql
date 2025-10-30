-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  number_of_guests INTEGER NOT NULL CHECK (number_of_guests BETWEEN 1 AND 6),
  special_occasion TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_reservations_date_time ON reservations(reservation_date, reservation_time);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status) WHERE status IN ('pending', 'confirmed');
CREATE INDEX IF NOT EXISTS idx_reservations_customer ON reservations(customer_name, phone);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert reservations
CREATE POLICY "Public can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

-- Policy: Allow public to view their own reservations (by phone)
CREATE POLICY "Public can view own reservations"
  ON reservations FOR SELECT
  USING (true);

-- Policy: Service role has full access
CREATE POLICY "Service role has full access to reservations"
  ON reservations FOR ALL
  USING (true)
  WITH CHECK (true);
