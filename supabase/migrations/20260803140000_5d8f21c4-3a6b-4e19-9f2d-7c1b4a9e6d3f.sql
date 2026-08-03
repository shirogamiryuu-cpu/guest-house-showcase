-- Approving a pending sign-up also confirms their email, since our own
-- admin-approval gate already vouches for the account.
CREATE OR REPLACE FUNCTION public.approve_pending_signup(_pending_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _pending RECORD;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  SELECT * INTO _pending FROM public.pending_signups WHERE id = _pending_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'pending signup not found';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (_pending.user_id, _pending.email, _pending.full_name, _pending.avatar_url)
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_pending.user_id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  UPDATE auth.users SET email_confirmed_at = COALESCE(email_confirmed_at, now())
  WHERE id = _pending.user_id;

  DELETE FROM public.pending_signups WHERE id = _pending_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.approve_pending_signup(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.approve_pending_signup(uuid) TO authenticated;
