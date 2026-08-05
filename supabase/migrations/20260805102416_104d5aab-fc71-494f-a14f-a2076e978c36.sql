-- Trigger functions must never be directly invocable via the API
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.guard_contract_update() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- has_role is used inside RLS policies; keep it callable but not by anonymous users
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Admin RPCs: authenticated only (they re-check admin role internally)
REVOKE ALL ON FUNCTION public.approve_pending_signup(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.approve_pending_signup(uuid) TO authenticated;

REVOKE ALL ON FUNCTION public.delete_user(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_user(uuid) TO authenticated;