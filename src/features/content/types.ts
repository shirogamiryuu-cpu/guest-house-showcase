import type { Database } from "@/integrations/supabase/types"


export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"]
export type ActivityRow = Database["public"]["Tables"]["activities"]["Row"]
export type EventRow = Database["public"]["Tables"]["events"]["Row"]
export type StatRow = Database["public"]["Tables"]["site_stats"]["Row"]
export type SiteContentRow = Database["public"]["Tables"]["site_content"]["Row"]

export type SiteContentMap = Record<string, string>
