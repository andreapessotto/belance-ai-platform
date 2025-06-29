/*
  # BELANCE Platform Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `subscription_tier` (text, default 'free')
      - `onboarding_completed` (boolean, default false)
      - `life_wheel_scores` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `ai_companions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `specialty` (text)
      - `personality_traits` (jsonb)
      - `description` (text)
      - `avatar_config` (jsonb)
      - `tier_requirement` (text)
    
    - `user_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `companion_id` (uuid, foreign key)
      - `conversation_summary` (text)
      - `duration` (integer)
      - `satisfaction_rating` (integer)
      - `life_area_focus` (text)
      - `created_at` (timestamp)
    
    - `calendar_events`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `event_type` (text)
      - `event_data` (jsonb)
      - `reminder_sent` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Add policies for reading AI companions data
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  subscription_tier text DEFAULT 'free',
  onboarding_completed boolean DEFAULT false,
  life_wheel_scores jsonb DEFAULT '{}',
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AI Companions table
CREATE TABLE IF NOT EXISTS ai_companions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  personality_traits jsonb DEFAULT '{}',
  description text,
  avatar_config jsonb DEFAULT '{}',
  tier_requirement text DEFAULT 'free',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- User Sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  companion_id uuid REFERENCES ai_companions(id),
  conversation_summary text,
  duration integer DEFAULT 0,
  satisfaction_rating integer CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 10),
  life_area_focus text,
  session_metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Calendar Events table
CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}',
  reminder_sent boolean DEFAULT false,
  scheduled_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Cross-companion notes table for memory system
CREATE TABLE IF NOT EXISTS companion_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  from_companion_id uuid REFERENCES ai_companions(id),
  to_companion_id uuid REFERENCES ai_companions(id),
  note_content text NOT NULL,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE companion_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_companions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can access own data"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

-- User sessions policies
CREATE POLICY "Users can access own sessions"
  ON user_sessions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Calendar events policies
CREATE POLICY "Users can access own calendar events"
  ON calendar_events
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Companion notes policies
CREATE POLICY "Users can access own companion notes"
  ON companion_notes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- AI companions are readable by all authenticated users
CREATE POLICY "AI companions are readable by authenticated users"
  ON ai_companions
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial AI companions data
INSERT INTO ai_companions (name, specialty, description, tier_requirement, sort_order, personality_traits, avatar_config) VALUES
(
  'SAGE',
  'Mental Health & Personal Development',
  'Your wise and grounding companion for mindfulness, anxiety management, and emotional regulation. SAGE helps you find inner peace and develop healthy coping strategies.',
  'free',
  1,
  '{"traits": ["calm", "philosophical", "grounding", "wise"], "approach": "mindful", "communication_style": "gentle_guidance"}',
  '{"age_range": "35-40", "gender": "neutral", "style": "zen-modern", "voice_tone": "calm_deep"}'
),
(
  'MAYA',
  'Relationship & Love Specialist',
  'Your empathetic guide for navigating romantic relationships, family dynamics, and friendship conflicts. Maya understands the complexities of human connection.',
  'premium',
  2,
  '{"traits": ["empathetic", "warm", "intuitive", "nurturing"], "approach": "heart-centered", "communication_style": "supportive_listening"}',
  '{"age_range": "28-32", "gender": "woman", "style": "casual-chic", "voice_tone": "warm_caring"}'
),
(
  'ALEX',
  'Career & Professional Growth',
  'Your strategic partner for leadership development, networking mastery, and workplace success. Alex helps you unlock your professional potential.',
  'premium',
  3,
  '{"traits": ["ambitious", "strategic", "encouraging", "results-oriented"], "approach": "goal-focused", "communication_style": "motivational_coaching"}',
  '{"age_range": "30-35", "gender": "man", "style": "business-casual", "voice_tone": "confident_encouraging"}'
),
(
  'VITA',
  'Health & Wellness Coach',
  'Your energetic motivator for fitness routines, nutrition guidance, and sleep optimization. Vita helps you build sustainable healthy habits.',
  'premium_plus',
  4,
  '{"traits": ["energetic", "motivating", "practical", "health-focused"], "approach": "holistic-wellness", "communication_style": "upbeat_motivational"}',
  '{"age_range": "25-30", "gender": "woman", "style": "athletic-lifestyle", "voice_tone": "energetic_positive"}'
),
(
  'FELIX',
  'Finance & Life Organization',
  'Your systematic guide for budgeting mastery, investment strategies, and productivity optimization. Felix brings order to your financial and personal life.',
  'premium_plus',
  5,
  '{"traits": ["analytical", "reliable", "solution-focused", "systematic"], "approach": "data-driven", "communication_style": "clear_structured"}',
  '{"age_range": "32-38", "gender": "man", "style": "smart-casual", "voice_tone": "professional_reassuring"}'
),
(
  'LUNA',
  'Creativity & Social Life',
  'Your inspiring catalyst for creative projects, hobby exploration, and social adventure. Luna helps you rediscover joy and spontaneity in life.',
  'premium_plus',
  6,
  '{"traits": ["playful", "inspiring", "spontaneous", "artistic"], "approach": "creative-exploration", "communication_style": "enthusiastic_imaginative"}',
  '{"age_range": "24-28", "gender": "woman", "style": "bohemian-artistic", "voice_tone": "playful_inspiring"}'
);