-- B2B Analytics Dashboard - Schema Migration
-- Creates tables for job market intelligence tracking

-- Companies table (Polish market employers)
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  industry TEXT, -- IT Services, Finance, Manufacturing, Retail, etc.
  size TEXT CHECK (size IN ('Small', 'Medium', 'Large', 'Enterprise')),
  logo_url TEXT,
  city TEXT, -- Kraków, Warszawa, Wrocław, etc.
  is_monitored BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job listings (scraped/aggregated data)
CREATE TABLE IF NOT EXISTS public.job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  level TEXT CHECK (level IN ('Stażysta/Praktykant', 'Junior', 'Mid/Regular', 'Senior', 'Lead/Principal', 'Manager/Head', 'Director/VP', 'C-level')),
  category TEXT, -- IT, HR, Finance, Sales, Marketing, Operations, Legal, etc.
  location TEXT, -- City name or "Remote" or "Hybrid"
  work_mode TEXT CHECK (work_mode IN ('Remote', 'Hybrid', 'Office', 'Unknown')),
  contract_type TEXT, -- B2B, Umowa o pracę, Umowa zlecenie, etc.
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'PLN',
  technologies TEXT[], -- Array of tech/skills
  benefits TEXT[], -- Array of benefits
  posted_at DATE NOT NULL,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  source_url TEXT UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily aggregated statistics (for performance)
CREATE TABLE IF NOT EXISTS public.daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  total_active INTEGER DEFAULT 0,
  new_listings INTEGER DEFAULT 0,
  closed_listings INTEGER DEFAULT 0,
  by_level JSONB DEFAULT '{}',
  by_category JSONB DEFAULT '{}',
  top_technologies JSONB DEFAULT '[]',
  top_benefits JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, company_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_job_listings_company_id ON public.job_listings(company_id);
CREATE INDEX IF NOT EXISTS idx_job_listings_posted_at ON public.job_listings(posted_at);
CREATE INDEX IF NOT EXISTS idx_job_listings_is_active ON public.job_listings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_listings_level ON public.job_listings(level);
CREATE INDEX IF NOT EXISTS idx_job_listings_category ON public.job_listings(category);
CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON public.daily_stats(date);
CREATE INDEX IF NOT EXISTS idx_daily_stats_company_id ON public.daily_stats(company_id);

-- RLS Policies (only authenticated users can read)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read companies" ON public.companies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read job_listings" ON public.job_listings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read daily_stats" ON public.daily_stats
  FOR SELECT TO authenticated USING (true);

-- Seed Data: Major Polish Employers
INSERT INTO public.companies (name, industry, size, city, is_monitored) VALUES
  ('Google Poland', 'IT Services', 'Enterprise', 'Warszawa', true),
  ('Microsoft Poland', 'IT Services', 'Enterprise', 'Warszawa', true),
  ('Meta Poland', 'IT Services', 'Large', 'Warszawa', true),
  ('Amazon Poland', 'E-commerce/Tech', 'Enterprise', 'Warszawa', true),
  ('IBM Poland', 'IT Services', 'Enterprise', 'Kraków', true),
  ('Accenture Poland', 'Consulting/IT', 'Enterprise', 'Warszawa', true),
  ('Deloitte Poland', 'Consulting', 'Enterprise', 'Warszawa', true),
  ('PwC Poland', 'Consulting', 'Enterprise', 'Warszawa', true),
  ('KPMG Poland', 'Consulting', 'Enterprise', 'Warszawa', true),
  ('EY Poland', 'Consulting', 'Enterprise', 'Warszawa', true),
  ('Luxmed', 'Healthcare', 'Large', 'Warszawa', true),
  ('Medicover', 'Healthcare', 'Large', 'Warszawa', true),
  ('Allegro', 'E-commerce', 'Large', 'Poznań', true),
  ('InPost', 'Logistics', 'Large', 'Kraków', true),
  ('CD Projekt Red', 'Gaming', 'Medium', 'Warszawa', true),
  ('Revolut', 'FinTech', 'Large', 'Kraków', true),
  ('N26', 'FinTech', 'Large', 'Warszawa', true),
  ('Wise', 'FinTech', 'Large', 'Warszawa', true),
  ('Wolt', 'Food Delivery', 'Medium', 'Warszawa', true),
  ('Bolt', 'Mobility', 'Large', 'Warszawa', true)
ON CONFLICT (name) DO NOTHING;

-- Seed Data: Sample Job Listings (Last 30 days)
-- This generates realistic data distribution across different companies and dates

DO $$
DECLARE
  company_record RECORD;
  posting_date DATE;
  i INTEGER;
BEGIN
  FOR company_record IN SELECT id, name FROM public.companies LOOP
    -- Generate 5-20 job postings per company over last 30 days
    FOR i IN 1..FLOOR(RANDOM() * 15 + 5)::INTEGER LOOP
      posting_date := CURRENT_DATE - FLOOR(RANDOM() * 30)::INTEGER;

      INSERT INTO public.job_listings (
        company_id,
        title,
        level,
        category,
        location,
        work_mode,
        contract_type,
        salary_min,
        salary_max,
        technologies,
        benefits,
        posted_at,
        is_active
      ) VALUES (
        company_record.id,
        CASE FLOOR(RANDOM() * 10)::INTEGER
          WHEN 0 THEN 'Software Engineer'
          WHEN 1 THEN 'Frontend Developer'
          WHEN 2 THEN 'Backend Developer'
          WHEN 3 THEN 'DevOps Engineer'
          WHEN 4 THEN 'Product Manager'
          WHEN 5 THEN 'Data Analyst'
          WHEN 6 THEN 'UX/UI Designer'
          WHEN 7 THEN 'QA Engineer'
          WHEN 8 THEN 'Project Manager'
          ELSE 'Business Analyst'
        END,
        CASE FLOOR(RANDOM() * 8)::INTEGER
          WHEN 0 THEN 'Stażysta/Praktykant'
          WHEN 1 THEN 'Junior'
          WHEN 2 THEN 'Mid/Regular'
          WHEN 3 THEN 'Mid/Regular'
          WHEN 4 THEN 'Senior'
          WHEN 5 THEN 'Senior'
          WHEN 6 THEN 'Lead/Principal'
          ELSE 'Manager/Head'
        END,
        CASE FLOOR(RANDOM() * 6)::INTEGER
          WHEN 0 THEN 'IT'
          WHEN 1 THEN 'HR'
          WHEN 2 THEN 'Finance'
          WHEN 3 THEN 'Sales'
          WHEN 4 THEN 'Marketing'
          ELSE 'Operations'
        END,
        CASE FLOOR(RANDOM() * 5)::INTEGER
          WHEN 0 THEN 'Warszawa'
          WHEN 1 THEN 'Kraków'
          WHEN 2 THEN 'Wrocław'
          WHEN 3 THEN 'Remote'
          ELSE 'Hybrid'
        END,
        CASE FLOOR(RANDOM() * 3)::INTEGER
          WHEN 0 THEN 'Remote'
          WHEN 1 THEN 'Hybrid'
          ELSE 'Office'
        END,
        CASE FLOOR(RANDOM() * 3)::INTEGER
          WHEN 0 THEN 'B2B'
          WHEN 1 THEN 'Umowa o pracę'
          ELSE 'Umowa zlecenie'
        END,
        5000 + FLOOR(RANDOM() * 15000)::INTEGER, -- salary_min
        10000 + FLOOR(RANDOM() * 20000)::INTEGER, -- salary_max
        ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL']::TEXT[],
        ARRAY['Prywatna opieka medyczna', 'Karta Multisport', 'Elastyczne godziny']::TEXT[],
        posting_date,
        RANDOM() > 0.2 -- 80% active, 20% closed
      );
    END LOOP;
  END LOOP;
END $$;

-- Generate daily_stats for the last 30 days
INSERT INTO public.daily_stats (date, company_id, total_active, new_listings, closed_listings, by_level, by_category)
SELECT
  posted_at AS date,
  company_id,
  COUNT(*) FILTER (WHERE is_active = true) AS total_active,
  COUNT(*) AS new_listings,
  COUNT(*) FILTER (WHERE is_active = false) AS closed_listings,
  jsonb_object_agg(level, level_count) AS by_level,
  jsonb_object_agg(category, category_count) AS by_category
FROM (
  SELECT
    posted_at,
    company_id,
    is_active,
    level,
    category,
    COUNT(*) OVER (PARTITION BY posted_at, company_id, level) AS level_count,
    COUNT(*) OVER (PARTITION BY posted_at, company_id, category) AS category_count
  FROM public.job_listings
) subquery
GROUP BY posted_at, company_id
ON CONFLICT (date, company_id) DO NOTHING;
