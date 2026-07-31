CREATE OR REPLACE FUNCTION public.guard_contract_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;
  NEW.user_id := OLD.user_id;
  NEW.title := OLD.title;
  NEW.client_name := OLD.client_name;
  NEW.contact_email := OLD.contact_email;
  NEW.project_type := OLD.project_type;
  NEW.description := OLD.description;
  NEW.amount := OLD.amount;
  NEW.currency := OLD.currency;
  NEW.duration_months := OLD.duration_months;
  NEW.maintenance_months := OLD.maintenance_months;
  NEW.status := OLD.status;
  NEW.start_date := OLD.start_date;
  NEW.end_date := OLD.end_date;
  NEW.admin_notes := OLD.admin_notes;
  IF OLD.signed_at IS NOT NULL THEN
    NEW.signed_name := OLD.signed_name;
    NEW.signed_at := OLD.signed_at;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.guard_contract_update() FROM authenticated, anon;

CREATE TRIGGER contracts_guard_update
  BEFORE UPDATE ON public.contracts
  FOR EACH ROW EXECUTE FUNCTION public.guard_contract_update();

DROP POLICY IF EXISTS "Users delete own pending contracts" ON public.contracts;
CREATE POLICY "Users delete own pending contracts" ON public.contracts
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id AND status = 'pending');