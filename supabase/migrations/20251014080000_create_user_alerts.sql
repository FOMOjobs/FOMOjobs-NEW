-- User Alerts System - Schema Migration
-- Stores user-created job alerts with flexible filtering

CREATE TABLE IF NOT EXISTS public.user_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Alert Configuration
  alert_name TEXT NOT NULL,
  notification_time TIME NOT NULL DEFAULT '09:00:00',
  is_active BOOLEAN DEFAULT TRUE,

  -- Filters (stored as arrays for flexibility)
  selected_companies TEXT[] DEFAULT '{}',
  selected_levels TEXT[] DEFAULT '{}',
  selected_categories TEXT[] DEFAULT '{}',

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_sent_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT alert_name_min_length CHECK (char_length(alert_name) >= 3),
  CONSTRAINT alert_name_max_length CHECK (char_length(alert_name) <= 100)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_alerts_user_id ON public.user_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_alerts_is_active ON public.user_alerts(is_active);
CREATE INDEX IF NOT EXISTS idx_user_alerts_notification_time ON public.user_alerts(notification_time);
CREATE INDEX IF NOT EXISTS idx_user_alerts_companies ON public.user_alerts USING GIN(selected_companies);
CREATE INDEX IF NOT EXISTS idx_user_alerts_levels ON public.user_alerts USING GIN(selected_levels);
CREATE INDEX IF NOT EXISTS idx_user_alerts_categories ON public.user_alerts USING GIN(selected_categories);

-- RLS Policies (users can only access their own alerts)
ALTER TABLE public.user_alerts ENABLE ROW LEVEL SECURITY;

-- Users can read their own alerts
CREATE POLICY "Users can read own alerts" ON public.user_alerts
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own alerts
CREATE POLICY "Users can insert own alerts" ON public.user_alerts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own alerts
CREATE POLICY "Users can update own alerts" ON public.user_alerts
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own alerts
CREATE POLICY "Users can delete own alerts" ON public.user_alerts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_alerts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER user_alerts_updated_at
  BEFORE UPDATE ON public.user_alerts
  FOR EACH ROW
  EXECUTE FUNCTION update_user_alerts_updated_at();
