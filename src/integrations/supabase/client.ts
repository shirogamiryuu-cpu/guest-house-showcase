// Next.js app: the browser Supabase client lives in "@/lib/supabase/client"
// (it reads NEXT_PUBLIC_* env vars). Re-exported here so generated integrations
// that import "../supabase/client" share the same single client instance.
export { supabase } from "@/lib/supabase/client";
