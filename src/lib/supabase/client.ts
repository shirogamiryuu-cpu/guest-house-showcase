"use client"

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/integrations/supabase/types"

// Publishable values are safe to ship; the fallbacks keep module evaluation
// working during builds where env files are not present.
const SUPABASE_URL =
  (process.env.NEXT_PUBLIC_SUPABASE_URL as string) ||
  "https://zvudlktmujurebdygmig.supabase.co"
const SUPABASE_PUBLISHABLE_KEY =
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) ||
  "sb_publishable_99buRIwiWvasBDw5E4qRbg_M4iY9TsU"


function isNewApiKey(value: string) {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_")
}

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    global: {
      fetch: (input, init) => {
        const headers = new Headers(
          typeof Request !== "undefined" && input instanceof Request
            ? input.headers
            : undefined,
        )
        if (init?.headers) {
          new Headers(init.headers).forEach((v, k) => headers.set(k, v))
        }
        // New-format keys are opaque strings, not bearer JWTs.
        if (
          isNewApiKey(SUPABASE_PUBLISHABLE_KEY) &&
          headers.get("Authorization") === `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
        ) {
          headers.delete("Authorization")
        }
        headers.set("apikey", SUPABASE_PUBLISHABLE_KEY)
        return fetch(input, { ...init, headers })
      },
    },
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)
