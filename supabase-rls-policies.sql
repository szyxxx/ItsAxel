-- Drop existing RLS policies for diary_entries if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON diary_entries;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON diary_entries;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON diary_entries;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON diary_entries;

-- Enable Row Level Security
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

-- Create new policies that don't rely on user_id
CREATE POLICY "Allow public read access" 
ON diary_entries FOR SELECT 
USING (is_public OR password IS NOT NULL);

CREATE POLICY "Allow all insert access" 
ON diary_entries FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow all update access" 
ON diary_entries FOR UPDATE 
USING (true);

CREATE POLICY "Allow all delete access" 
ON diary_entries FOR DELETE 
USING (true);
