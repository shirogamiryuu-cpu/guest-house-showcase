"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

interface ContentRow {
  key: string
  value: string
}

export function SiteContentEditor() {
  const [rows, setRows] = useState<ContentRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from("site_content")
      .select("key, value")
      .order("key", { ascending: true })
    if (loadError) setError(loadError.message)
    setRows(data ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function save(row: ContentRow) {
    setError(null)
    setStatus(null)
    const { error: saveError } = await supabase
      .from("site_content")
      .upsert({ key: row.key, value: row.value })
    if (saveError) setError(saveError.message)
    else setStatus(`Saved “${row.key}”.`)
  }

  return (
    <section className="rounded-[15px] bg-white p-5 shadow-[0_4px_13px_rgba(19,22,38,0.12)] md:p-6">
      <h2 className="font-sans text-lg font-medium text-[#131626]">Home content</h2>
      {error && (
        <p className="mt-3 rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">{error}</p>
      )}
      {status && (
        <p className="mt-3 rounded-[10px] bg-emerald-50 px-3 py-2 font-sans text-sm text-emerald-700">{status}</p>
      )}
      <div className="mt-4 flex flex-col gap-4">
        {rows.map((row, i) => (
          <div key={row.key} className="flex flex-col gap-2">
            <span className="font-sans text-xs text-[#3343a5]">{row.key}</span>
            <textarea
              value={row.value}
              rows={2}
              onChange={(e) =>
                setRows((prev) =>
                  prev.map((r, idx) => (idx === i ? { ...r, value: e.target.value } : r)),
                )
              }
              className="rounded-[10px] border border-[#3343a5]/25 px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
            />
            <button
              onClick={() => save(row)}
              className="self-start rounded-[15px] bg-[#131a3f] px-5 py-2 font-sans text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
