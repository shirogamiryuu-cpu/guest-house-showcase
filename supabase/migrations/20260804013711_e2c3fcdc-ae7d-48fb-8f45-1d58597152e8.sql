ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS detail text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS gallery text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS telegram_url text NOT NULL DEFAULT '';

INSERT INTO public.site_content (key, value) VALUES
  ('products_telegram_url', 'https://t.me/youthsmyanmar'),
  ('products_order_label', 'Order Now')
ON CONFLICT (key) DO NOTHING;