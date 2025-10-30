-- Function to check table availability
CREATE OR REPLACE FUNCTION check_table_availability(
  p_date DATE,
  p_time TIME
)
RETURNS INTEGER AS $$
DECLARE
  reserved_tables INTEGER;
  total_tables INTEGER := 12; -- Osteria Luna Nera has 12 tables
BEGIN
  -- Count how many tables are already reserved for this date/time
  SELECT COUNT(*)
  INTO reserved_tables
  FROM reservations
  WHERE reservation_date = p_date
    AND reservation_time = p_time
    AND status IN ('pending', 'confirmed', 'seated');

  -- Return available tables
  RETURN total_tables - reserved_tables;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION check_table_availability(DATE, TIME) TO anon;
GRANT EXECUTE ON FUNCTION check_table_availability(DATE, TIME) TO authenticated;
