-- A prior migration re-ran the seed INSERTs without ON CONFLICT guards,
-- duplicating site_stats/projects/activities/events rows. Drop the extras,
-- keeping the oldest row per natural key.
DELETE FROM public.site_stats a USING public.site_stats b
WHERE a.label = b.label AND a.updated_at > b.updated_at;

DELETE FROM public.projects a USING public.projects b
WHERE a.title = b.title AND a.image_url = b.image_url AND a.created_at > b.created_at;

DELETE FROM public.activities a USING public.activities b
WHERE a.title = b.title AND a.kind = b.kind AND a.image_url = b.image_url AND a.created_at > b.created_at;

DELETE FROM public.events a USING public.events b
WHERE a.title = b.title AND a.image_url = b.image_url AND a.created_at > b.created_at;
