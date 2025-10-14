-- Enhanced Mock Data for B2B Analytics Dashboard
-- Generates 600-800 realistic job listings with proper distribution

-- First, clear existing mock data (keep schema)
TRUNCATE public.job_listings CASCADE;
TRUNCATE public.daily_stats CASCADE;

-- Enhanced seed data generation
DO $$
DECLARE
  company_record RECORD;
  posting_date DATE;
  job_count INTEGER;
  i INTEGER;
  selected_level TEXT;
  salary_min_val INTEGER;
  salary_max_val INTEGER;
  tech_count INTEGER;
  benefit_count INTEGER;
  selected_techs TEXT[];
  selected_benefits TEXT[];
  all_techs TEXT[] := ARRAY[
    'React', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'Next.js', 'Nuxt.js', 'HTML/CSS', 'Tailwind CSS', 'SASS',
    'Node.js', 'Python', 'Java', '.NET/C#', 'PHP', 'Go', 'Ruby', 'Scala', 'Kotlin', 'Spring Boot', 'Django', 'FastAPI',
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android',
    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Apache Kafka', 'Apache Spark',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions',
    'Git', 'REST API', 'GraphQL', 'Microservices', 'Agile/Scrum', 'JIRA', 'Confluence',
    'Excel', 'SAP', 'Workday', 'Power BI', 'Tableau'
  ];
  all_benefits TEXT[] := ARRAY[
    'Prywatna opieka medyczna (Luxmed, Medicover)',
    'Karta MultiSport / MyBenefit',
    'Praca zdalna / Remote work',
    'Elastyczne godziny pracy',
    'Budżet szkoleniowy (5000-10000 PLN/rok)',
    'Kursy językowe (angielski)',
    'Ubezpieczenie na życie',
    'PPK/PPE (pracownicze plany kapitałowe)',
    'Parking / Dofinansowanie do parkingu',
    'Karta lunch / Lunch card (Sodexo, Edenred)',
    'Owoce w biurze / Free snacks',
    'Strefa relaksu / Game room',
    'Laptop + monitor / Sprzęt do pracy',
    'Telefon służbowy',
    'Samochód służbowy (dla Manager+)',
    'Dofinansowanie do okularów',
    'Team events / Integracje',
    'Dofinansowanie do internetu (home office)',
    'Bonus roczny / Annual bonus',
    'Urlop wypoczynkowy 26 dni',
    'Dodatkowe dni wolne (birthday day off)',
    'Mental health support / Psycholog',
    'Kafeteria benefitów',
    'Pakiet medyczny dla rodziny',
    'Dofinansowanie do studiów/certyfikacji'
  ];
  date_distribution FLOAT;
BEGIN
  FOR company_record IN SELECT id, name FROM public.companies LOOP
    -- Generate 15-40 jobs per company (avg ~27.5, target 600-800 total for 20 companies)
    job_count := 15 + FLOOR(RANDOM() * 26)::INTEGER;

    FOR i IN 1..job_count LOOP
      -- Date distribution: 40% last 30d, 35% 31-60d, 25% 61-90d
      date_distribution := RANDOM();
      IF date_distribution < 0.40 THEN
        posting_date := CURRENT_DATE - FLOOR(RANDOM() * 30)::INTEGER;
      ELSIF date_distribution < 0.75 THEN
        posting_date := CURRENT_DATE - (30 + FLOOR(RANDOM() * 30)::INTEGER);
      ELSE
        posting_date := CURRENT_DATE - (60 + FLOOR(RANDOM() * 30)::INTEGER);
      END IF;

      -- Select level with realistic distribution
      selected_level := CASE FLOOR(RANDOM() * 100)::INTEGER
        WHEN 0, 1, 2, 3, 4 THEN 'Stażysta/Praktykant'  -- 5%
        WHEN 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 THEN 'Junior'  -- 15%
        WHEN 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 THEN 'Mid/Regular'  -- 25%
        WHEN 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69 THEN 'Senior'  -- 25%
        WHEN 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84 THEN 'Lead/Principal'  -- 15%
        WHEN 85, 86, 87, 88, 89, 90, 91, 92 THEN 'Manager/Head'  -- 8%
        WHEN 93, 94, 95, 96 THEN 'Director/VP'  -- 4%
        ELSE 'C-level'  -- 3%
      END;

      -- Salary ranges based on level
      CASE selected_level
        WHEN 'Stażysta/Praktykant' THEN
          salary_min_val := 2000 + FLOOR(RANDOM() * 2000)::INTEGER;
          salary_max_val := salary_min_val + 1000 + FLOOR(RANDOM() * 1000)::INTEGER;
        WHEN 'Junior' THEN
          salary_min_val := 4000 + FLOOR(RANDOM() * 4000)::INTEGER;
          salary_max_val := salary_min_val + 2000 + FLOOR(RANDOM() * 2000)::INTEGER;
        WHEN 'Mid/Regular' THEN
          salary_min_val := 8000 + FLOOR(RANDOM() * 6000)::INTEGER;
          salary_max_val := salary_min_val + 3000 + FLOOR(RANDOM() * 3000)::INTEGER;
        WHEN 'Senior' THEN
          salary_min_val := 14000 + FLOOR(RANDOM() * 8000)::INTEGER;
          salary_max_val := salary_min_val + 4000 + FLOOR(RANDOM() * 4000)::INTEGER;
        WHEN 'Lead/Principal' THEN
          salary_min_val := 20000 + FLOOR(RANDOM() * 10000)::INTEGER;
          salary_max_val := salary_min_val + 5000 + FLOOR(RANDOM() * 5000)::INTEGER;
        WHEN 'Manager/Head' THEN
          salary_min_val := 25000 + FLOOR(RANDOM() * 10000)::INTEGER;
          salary_max_val := salary_min_val + 6000 + FLOOR(RANDOM() * 4000)::INTEGER;
        WHEN 'Director/VP' THEN
          salary_min_val := 35000 + FLOOR(RANDOM() * 15000)::INTEGER;
          salary_max_val := salary_min_val + 8000 + FLOOR(RANDOM() * 7000)::INTEGER;
        ELSE  -- C-level
          salary_min_val := 50000 + FLOOR(RANDOM() * 30000)::INTEGER;
          salary_max_val := salary_min_val + 10000 + FLOOR(RANDOM() * 10000)::INTEGER;
      END CASE;

      -- Technologies: 5-8 random techs for IT, 2-4 for others
      tech_count := CASE
        WHEN RANDOM() < 0.7 THEN 5 + FLOOR(RANDOM() * 4)::INTEGER  -- IT: 5-8 techs
        ELSE 2 + FLOOR(RANDOM() * 3)::INTEGER  -- Non-IT: 2-4 techs
      END;

      selected_techs := ARRAY[]::TEXT[];
      FOR j IN 1..tech_count LOOP
        selected_techs := array_append(selected_techs, all_techs[1 + FLOOR(RANDOM() * array_length(all_techs, 1))::INTEGER]);
      END LOOP;

      -- Benefits: 4-10 random benefits (more for senior roles)
      benefit_count := CASE
        WHEN selected_level IN ('Lead/Principal', 'Manager/Head', 'Director/VP', 'C-level')
          THEN 7 + FLOOR(RANDOM() * 4)::INTEGER  -- 7-10 benefits
        ELSE 4 + FLOOR(RANDOM() * 4)::INTEGER  -- 4-7 benefits
      END;

      selected_benefits := ARRAY[]::TEXT[];
      FOR j IN 1..benefit_count LOOP
        selected_benefits := array_append(selected_benefits, all_benefits[1 + FLOOR(RANDOM() * array_length(all_benefits, 1))::INTEGER]);
      END LOOP;

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
        -- Job titles
        CASE FLOOR(RANDOM() * 20)::INTEGER
          WHEN 0 THEN 'Software Engineer'
          WHEN 1 THEN 'Frontend Developer'
          WHEN 2 THEN 'Backend Developer'
          WHEN 3 THEN 'Full Stack Developer'
          WHEN 4 THEN 'DevOps Engineer'
          WHEN 5 THEN 'Product Manager'
          WHEN 6 THEN 'Data Analyst'
          WHEN 7 THEN 'Data Engineer'
          WHEN 8 THEN 'Data Scientist'
          WHEN 9 THEN 'UX/UI Designer'
          WHEN 10 THEN 'QA Engineer'
          WHEN 11 THEN 'QA Automation Engineer'
          WHEN 12 THEN 'Project Manager'
          WHEN 13 THEN 'Business Analyst'
          WHEN 14 THEN 'Scrum Master'
          WHEN 15 THEN 'HR Specialist'
          WHEN 16 THEN 'Sales Manager'
          WHEN 17 THEN 'Marketing Manager'
          WHEN 18 THEN 'Finance Analyst'
          ELSE 'Account Manager'
        END,
        selected_level,
        -- Categories
        CASE FLOOR(RANDOM() * 8)::INTEGER
          WHEN 0 THEN 'IT'
          WHEN 1 THEN 'IT'
          WHEN 2 THEN 'IT'
          WHEN 3 THEN 'IT'
          WHEN 4 THEN 'IT'  -- 62.5% IT
          WHEN 5 THEN 'HR'
          WHEN 6 THEN 'Finance'
          ELSE 'Sales'
        END,
        -- Locations: Warszawa 35%, Kraków 30%, Wrocław 15%, Others 20%
        CASE FLOOR(RANDOM() * 100)::INTEGER
          WHEN 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34 THEN 'Warszawa'
          WHEN 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64 THEN 'Kraków'
          WHEN 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 THEN 'Wrocław'
          WHEN 80, 81, 82, 83, 84, 85, 86, 87 THEN 'Gdańsk'
          WHEN 88, 89, 90, 91, 92, 93, 94 THEN 'Poznań'
          ELSE 'Remote'
        END,
        -- Work mode: 30% remote, 50% hybrid, 20% office
        CASE FLOOR(RANDOM() * 10)::INTEGER
          WHEN 0, 1, 2 THEN 'Remote'  -- 30%
          WHEN 3, 4, 5, 6, 7 THEN 'Hybrid'  -- 50%
          ELSE 'Office'  -- 20%
        END,
        -- Contract type
        CASE FLOOR(RANDOM() * 10)::INTEGER
          WHEN 0, 1, 2, 3, 4 THEN 'B2B'  -- 50%
          WHEN 5, 6, 7, 8 THEN 'Umowa o pracę'  -- 40%
          ELSE 'Umowa zlecenie'  -- 10%
        END,
        salary_min_val,
        salary_max_val,
        selected_techs,
        selected_benefits,
        posting_date,
        RANDOM() > 0.15  -- 85% active, 15% closed
      );
    END LOOP;
  END LOOP;
END $$;

-- Regenerate daily_stats for last 90 days
INSERT INTO public.daily_stats (date, company_id, total_active, new_listings, closed_listings, by_level, by_category)
SELECT
  posted_at AS date,
  company_id,
  COUNT(*) FILTER (WHERE is_active = true) AS total_active,
  COUNT(*) AS new_listings,
  COUNT(*) FILTER (WHERE is_active = false) AS closed_listings,
  jsonb_object_agg(COALESCE(level, 'Unknown'), level_count) FILTER (WHERE level IS NOT NULL) AS by_level,
  jsonb_object_agg(COALESCE(category, 'Unknown'), category_count) FILTER (WHERE category IS NOT NULL) AS by_category
FROM (
  SELECT DISTINCT
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
ON CONFLICT (date, company_id) DO UPDATE SET
  total_active = EXCLUDED.total_active,
  new_listings = EXCLUDED.new_listings,
  closed_listings = EXCLUDED.closed_listings,
  by_level = EXCLUDED.by_level,
  by_category = EXCLUDED.by_category;
