"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type { ContractRow } from "./types"

export function useContracts(enabled: boolean) {
  const [contracts, setContracts] = useState<ContractRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!enabled) {
      setContracts([])
      setLoading(false)
      return
    }
    setLoading(true)
    const { data, error: loadError } = await supabase
      .from("contracts")
      .select("*")
      .order("created_at", { ascending: false })
    if (loadError) setError(loadError.message)
    else setError(null)
    setContracts((data as ContractRow[]) ?? [])
    setLoading(false)
  }, [enabled])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  return { contracts, loading, error, reload: load, setError }
}

export function contractStats(contracts: ContractRow[]) {
  const count = (status: string) =>
    contracts.filter((c) => c.status === status).length
  return {
    total: contracts.length,
    pending: count("pending"),
    active: count("active"),
    completed: count("completed"),
    expired: count("expired"),
  }
}
