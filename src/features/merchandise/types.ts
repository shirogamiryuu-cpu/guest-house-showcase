import type { MerchBoothRow } from "@/integrations/supabase/content-types"

/**
 * Booth row as rendered by the UI. The stored columns are extended with
 * optional presentation fields that may be filled in by the admin later.
 */
export type BoothRow = MerchBoothRow & {
  map_query?: string | null
  location_name?: string | null
  event_date?: string | null
  available_hours?: string | null
}
