"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type { BoothRow } from "@/features/merchandise/types"
import type {
  ActivityRow,
  EventRow,
  ProjectRow,
  SiteContentMap,
  StatRow,
} from "./types"

function useTable<T>(load: () => Promise<T>, initial: T) {
  const [data, setData] = useState<T>(initial)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      setData(await load())
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return { data, loading, reload }
}

export function useProjects() {
  return useTable<ProjectRow[]>(async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
    return data ?? []
  }, [])
}

export function useActivities(kind?: "past" | "upcoming") {
  return useTable<ActivityRow[]>(async () => {
    let query = supabase.from("activities").select("*")
    if (kind) query = query.eq("kind", kind)
    const { data } = await query.order("sort_order", { ascending: true })
    return data ?? []
  }, [])
}

export function useEvents() {
  return useTable<EventRow[]>(async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("sort_order", { ascending: true })
    return data ?? []
  }, [])
}

export function useBooths() {
  return useTable<BoothRow[]>(async () => {
    const { data } = await supabase
      .from("booths")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
    return data ?? []
  }, [])
}

export function useStats() {
  return useTable<StatRow[]>(async () => {
    const { data } = await supabase
      .from("site_stats")
      .select("*")
      .order("sort_order", { ascending: true })
    return data ?? []
  }, [])
}

export function useSiteContent() {
  return useTable<SiteContentMap>(async () => {
    const { data } = await supabase.from("site_content").select("key, value")
    const map: SiteContentMap = {}
    for (const row of data ?? []) map[row.key] = row.value
    return map
  }, {})
}
