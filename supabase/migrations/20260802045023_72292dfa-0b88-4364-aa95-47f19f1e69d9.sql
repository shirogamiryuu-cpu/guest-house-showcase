CREATE TABLE public.booths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  event_date text NOT NULL DEFAULT '',
  available_hours text NOT NULL DEFAULT '',
  selling_items text NOT NULL DEFAULT '',
  location_name text NOT NULL DEFAULT '',
  map_query text NOT NULL DEFAULT '',
  link_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.booths TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.booths TO authenticated;
GRANT ALL ON public.booths TO service_role;

ALTER TABLE public.booths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published booths" ON public.booths
  FOR SELECT USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert booths" ON public.booths
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update booths" ON public.booths
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete booths" ON public.booths
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_booths_updated_at BEFORE UPDATE ON public.booths
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.booths (title, event_date, available_hours, selling_items, location_name, map_query, sort_order) VALUES
  ('Uit Fresher Welcome', '08-05-2026', '7:00 AM - 1:00 PM', 'T-Shirts, Hoodies, Stickers', 'University of Information Technology, Yangon', 'University of Information Technology, Yangon', 1),
  ('YTU Anniversary', '08-05-2026', '7:00 AM - 1:00 PM', 'T-Shirts, Hoodies, Stickers', 'Yangon Technological University', 'Yangon Technological University', 2),
  ('YU Farewell', '08-05-2026', '7:00 AM - 1:00 PM', 'T-Shirts, Hoodies, Stickers', 'University of Yangon', 'University of Yangon', 3);

INSERT INTO public.site_content (key, value) VALUES
  ('merch_booths_title', 'Upcoming Booths'),
  ('merch_see_more_label', 'See more')
ON CONFLICT (key) DO NOTHING;