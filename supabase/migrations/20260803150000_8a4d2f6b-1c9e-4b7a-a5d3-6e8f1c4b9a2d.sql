-- Admin-only user deletion. Deleting the auth.users row cascades to
-- profiles and user_roles via their existing foreign keys.
CREATE OR REPLACE FUNCTION public.delete_user(_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  IF _user_id = auth.uid() THEN
    RAISE EXCEPTION 'cannot delete your own account';
  END IF;

  DELETE FROM auth.users WHERE id = _user_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.delete_user(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_user(uuid) TO authenticated;
