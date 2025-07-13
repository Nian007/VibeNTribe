/*
  # VibeNTribe Initial Schema

  This migration sets up the initial tables for the VibeNTribe application.

  ## Tables Created:
  - `profiles`: Stores user profile information, extending `auth.users`. Includes onboarding status and group preferences.
  - `travel_periods`: Stores multiple travel date ranges for each user.

  ## Enums Created:
  - `group_preference_enum`: Defines the possible values for group travel preferences ('mixed', 'couples', 'girls-only').

  ## Security:
  - Row Level Security (RLS) is enabled for all tables.
  - Policies are created to allow users to manage their own data.
  - A function `is_onboarded` is created to check user's onboarding status.
*/

-- Create custom types
CREATE TYPE public.group_preference_enum AS ENUM (
  'mixed',
  'couples',
  'girls-only'
);

-- Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ,
  full_name TEXT,
  avatar_url TEXT,
  linkedin_url TEXT,
  group_preference public.group_preference_enum,
  is_onboarded BOOLEAN DEFAULT false NOT NULL
);

-- Add comments to profiles table
COMMENT ON TABLE public.profiles IS 'Profile information for users.';
COMMENT ON COLUMN public.profiles.id IS 'References the user in auth.users.';

-- Create Travel Periods Table
CREATE TABLE IF NOT EXISTS public.travel_periods (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  CONSTRAINT dates_check CHECK (end_date >= start_date)
);

-- Add comments to travel_periods table
COMMENT ON TABLE public.travel_periods IS 'Stores user-defined travel date ranges.';

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS travel_periods_user_id_idx ON public.travel_periods(user_id);
CREATE INDEX IF NOT EXISTS travel_periods_start_date_idx ON public.travel_periods(start_date);
CREATE INDEX IF NOT EXISTS travel_periods_end_date_idx ON public.travel_periods(end_date);
CREATE INDEX IF NOT EXISTS profiles_group_preference_idx ON public.profiles(group_preference);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_periods ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS Policies for Travel Periods
CREATE POLICY "Users can manage their own travel periods" ON public.travel_periods
  FOR ALL USING (auth.uid() = user_id);

-- Function to automatically create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to check if a user has completed onboarding
CREATE OR REPLACE FUNCTION public.is_onboarded(user_id_to_check UUID)
RETURNS BOOLEAN AS $$
DECLARE
  onboarded_status BOOLEAN;
BEGIN
  SELECT is_onboarded INTO onboarded_status
  FROM public.profiles
  WHERE id = user_id_to_check;
  RETURN onboarded_status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;