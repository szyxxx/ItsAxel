-- Create a table for user profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Create a table for diary entries
CREATE TABLE diary_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  tags TEXT[],
  is_public BOOLEAN DEFAULT FALSE,
  password TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create a table for AI knowledge base
CREATE TABLE ai_knowledge (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_knowledge ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for diary entries
CREATE POLICY "Public diary entries are viewable by everyone" ON diary_entries
  FOR SELECT USING (is_public OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own diary entries" ON diary_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diary entries" ON diary_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own diary entries" ON diary_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for AI knowledge
CREATE POLICY "Users can view their own AI knowledge" ON ai_knowledge
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI knowledge" ON ai_knowledge
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI knowledge" ON ai_knowledge
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI knowledge" ON ai_knowledge
  FOR DELETE USING (auth.uid() = user_id);