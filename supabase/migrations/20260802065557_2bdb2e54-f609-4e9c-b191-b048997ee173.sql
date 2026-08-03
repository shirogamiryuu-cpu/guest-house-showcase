-- Ensure user_roles uniqueness for upserts
DO $$ BEGIN
  ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);
EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated, PUBLIC;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data ->> 'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, CASE WHEN lower(NEW.email) = 'admin@youths.com' THEN 'admin'::public.app_role ELSE 'user'::public.app_role END)
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  link_url text NOT NULL DEFAULT '',
  credits text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  kind text NOT NULL DEFAULT 'past',
  image_url text NOT NULL DEFAULT '',
  register_url text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  event_date date,
  image_url text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_content (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.merch_booths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  date_text text NOT NULL DEFAULT '',
  hours_text text NOT NULL DEFAULT '',
  selling_items text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects, public.activities, public.events, public.site_stats, public.site_content, public.merch_booths TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects, public.activities, public.events, public.site_stats, public.site_content, public.merch_booths TO authenticated;
GRANT ALL ON public.projects, public.activities, public.events, public.site_stats, public.site_content, public.merch_booths TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merch_booths ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins manage projects" ON public.projects;
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public read activities" ON public.activities;
CREATE POLICY "Public read activities" ON public.activities FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins manage activities" ON public.activities;
CREATE POLICY "Admins manage activities" ON public.activities FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public read events" ON public.events;
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins manage events" ON public.events;
CREATE POLICY "Admins manage events" ON public.events FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public read stats" ON public.site_stats;
CREATE POLICY "Public read stats" ON public.site_stats FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins manage stats" ON public.site_stats;
CREATE POLICY "Admins manage stats" ON public.site_stats FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public read content" ON public.site_content;
CREATE POLICY "Public read content" ON public.site_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins manage content" ON public.site_content;
CREATE POLICY "Admins manage content" ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Public read merch booths" ON public.merch_booths;
CREATE POLICY "Public read merch booths" ON public.merch_booths FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins manage merch booths" ON public.merch_booths;
CREATE POLICY "Admins manage merch booths" ON public.merch_booths FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  client_name text NOT NULL DEFAULT '',
  contact_email text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT 'Web Development',
  description text NOT NULL DEFAULT '',
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'MMK',
  duration_months integer NOT NULL DEFAULT 1,
  maintenance_months integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  start_date date,
  end_date date,
  admin_notes text NOT NULL DEFAULT '',
  signed_name text,
  signed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contracts TO authenticated;
GRANT ALL ON public.contracts TO service_role;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users view own contracts" ON public.contracts;
CREATE POLICY "Users view own contracts" ON public.contracts FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Users create own contracts" ON public.contracts;
CREATE POLICY "Users create own contracts" ON public.contracts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'pending');
DROP POLICY IF EXISTS "Users sign own contracts" ON public.contracts;
CREATE POLICY "Users sign own contracts" ON public.contracts FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users delete own pending contracts" ON public.contracts;
CREATE POLICY "Users delete own pending contracts" ON public.contracts FOR DELETE TO authenticated
  USING (auth.uid() = user_id AND status = 'pending');
DROP POLICY IF EXISTS "Admins manage contracts" ON public.contracts;
CREATE POLICY "Admins manage contracts" ON public.contracts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.guard_contract_update()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN RETURN NEW; END IF;
  NEW.user_id := OLD.user_id; NEW.title := OLD.title; NEW.client_name := OLD.client_name;
  NEW.contact_email := OLD.contact_email; NEW.project_type := OLD.project_type;
  NEW.description := OLD.description; NEW.amount := OLD.amount; NEW.currency := OLD.currency;
  NEW.duration_months := OLD.duration_months; NEW.maintenance_months := OLD.maintenance_months;
  NEW.status := OLD.status; NEW.start_date := OLD.start_date; NEW.end_date := OLD.end_date;
  NEW.admin_notes := OLD.admin_notes;
  IF OLD.signed_at IS NOT NULL THEN NEW.signed_name := OLD.signed_name; NEW.signed_at := OLD.signed_at; END IF;
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.guard_contract_update() FROM authenticated, anon;

DROP TRIGGER IF EXISTS projects_updated ON public.projects;
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS activities_updated ON public.activities;
CREATE TRIGGER activities_updated BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS events_updated ON public.events;
CREATE TRIGGER events_updated BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS stats_updated ON public.site_stats;
CREATE TRIGGER stats_updated BEFORE UPDATE ON public.site_stats FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS content_updated ON public.site_content;
CREATE TRIGGER content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS profiles_updated ON public.profiles;
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS merch_booths_updated ON public.merch_booths;
CREATE TRIGGER merch_booths_updated BEFORE UPDATE ON public.merch_booths FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS contracts_set_updated_at ON public.contracts;
CREATE TRIGGER contracts_set_updated_at BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS contracts_guard_update ON public.contracts;
CREATE TRIGGER contracts_guard_update BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION public.guard_contract_update();

INSERT INTO public.site_stats (label, value, sort_order) VALUES
  ('Members', '30+', 1), ('Events', '30+', 2), ('Projects', '30+', 3), ('Achievements', '30+', 4);

INSERT INTO public.projects (title, description, image_url, sort_order) VALUES
  ('Project One', 'Register Now!', '/Bwtnd.png', 1),
  ('Project Two', 'Register Now!', '/Y6kHUB.png', 2),
  ('Project Three', 'Register Now!', '/a5m3q8.png', 3),
  ('Project Four', 'Register Now!', '/aRiz0.png', 4);

INSERT INTO public.activities (title, kind, image_url, sort_order) VALUES
  ('First Event Hosted', 'past', '/Bwtnd.png', 1),
  ('First Event Hosted', 'past', '/Y6kHUB.png', 2),
  ('First Event Hosted', 'past', '/a5m3q8.png', 3),
  ('First Event Hosted', 'past', '/aRiz0.png', 4),
  ('Upcoming Activity', 'upcoming', '/Bwtnd.png', 1),
  ('Upcoming Activity', 'upcoming', '/Y6kHUB.png', 2),
  ('Upcoming Activity', 'upcoming', '/a5m3q8.png', 3),
  ('Upcoming Activity', 'upcoming', '/aRiz0.png', 4);

INSERT INTO public.events (title, description, image_url, sort_order) VALUES
  ('Youth Leadership Summit', 'A weekend of workshops and networking', '/Bwtnd.png', 1),
  ('Community Hackathon', 'Build solutions for local challenges', '/Y6kHUB.png', 2);

INSERT INTO public.merch_booths (title, image_url, date_text, hours_text, selling_items, featured, sort_order) VALUES
  ('Uit Fresher Welcome', '/a5m3q8.png', 'Date: 08-05-2026', 'Available Hours: 7:00 AM - 1:00 PM', 'Selling Items: T-Shirts, Hoodies, Stickers', true, 1),
  ('YTU Anniversary', '/aRiz0.png', 'Date: 20-06-2026', 'Available Hours: 9:00 AM - 4:00 PM', 'Selling Items: T-Shirts, Tote Bags', false, 2),
  ('YU Farewell', '/Bwtnd.png', 'Date: 12-07-2026', 'Available Hours: 8:00 AM - 2:00 PM', 'Selling Items: Hoodies, Stickers', false, 3);

INSERT INTO public.site_content (key, value) VALUES
('hero_title','Building Today, Inspiring Tomorrow'),
('hero_subtitle','We connect talented youths with meaningful opportunities to learn, build and grow together.'),
('hero_cta_label','Register Now'),
('hero_image_url','/Bwtnd.png'),
('home_who_eyebrow','WHO WE ARE'),
('home_who_title','Empowering Youths Through Actions'),
('home_who_description','We create space for young people to build real skills through collaboration, mentorship and hands-on projects.'),
('home_who_cta_label','Learn More'),
('home_feature1_title','Skill Development'),
('home_feature1_description','Access training programs to level up your skills'),
('home_feature2_title','Collaborative Projects'),
('home_feature2_description','Join forces with others to solve problems and create impact'),
('home_feature3_title','Leadership'),
('home_feature3_description','Lead initiatives and grow as future leaders'),
('home_feature4_title','Community Impacts'),
('home_feature4_description','Contribute to change through meaningful actions'),
('home_events_title','Upcoming Events'),
('home_projects_title','Projects Published'),
('about_title','About YOUTHs'),
('about_paragraph1','YOUTHs is a youth-driven community turning creativity and ambition into real opportunities.'),
('about_paragraph2','We bring together designers, developers and organisers to deliver professional work while learning from each other.'),
('about_image_url','/Bwtnd.png'),
('about_quote_words','LEARN, BUILD, COLLABORATE, EARN'),
('about_mission_title','Our Mission'),
('about_mission_text','To empower talented youth by connecting them with meaningful opportunities, delivering professional digital and creative services, and fostering growth through collaboration, technology, and fair recognition.'),
('about_vision_title','Our Vision'),
('about_vision_text','To become a globally recognized youth-driven talent ecosystem that transforms creativity and innovation into sustainable opportunities and positive impact.'),
('about_values_title','Our Values'),
('about_values_list','Respect Clients & Commitments, Real Skills Building, Responsibility, Collaboration, Innovation, Integrity, Fairness, Quality, Growth'),
('about_grow_heading1','Learn & Grow'),
('about_grow_heading2','With YOUTHs'),
('about_grow_description','Join workshops, real client projects and a community that helps you level up every month.'),
('about_grow_image_url','/Y6kHUB.png'),
('activities_past_title','Past Activities'),
('activities_upcoming_title','Upcoming Activities'),
('activities_register_label','Register Now'),
('events_upcoming_title','Upcoming Events'),
('merch_booths_title','Upcoming Booths'),
('merch_map_title','Find Our Booth'),
('merch_map_address','University of Information Technology, Yangon, Myanmar'),
('merch_map_query','University of Information Technology, Yangon, Myanmar')
ON CONFLICT (key) DO NOTHING;