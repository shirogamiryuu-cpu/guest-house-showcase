-- Backfill: confirm email for already-approved profiles created before
-- approve_pending_signup started doing this automatically.
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE id IN (SELECT id FROM public.profiles);
