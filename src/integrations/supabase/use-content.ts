"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type {
  ActivityRow,
  EventRow,
  ProductRow,
  ProjectRow,
  SiteContentMap,
  StatRow,
} from "./content-types"

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

export function useProducts() {
  return useTable<ProductRow[]>(async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
    return data ?? []
  }, [])
}

export function useProduct(id: string) {
  return useTable<ProductRow | null>(async () => {
    const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle()
    return data ?? null
  }, null)
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
