"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export type FieldType = "text" | "textarea" | "number" | "boolean"

export interface FieldDef {
  name: string
  label: string
  type?: FieldType
  placeholder?: string
}

interface ResourceEditorProps {
  table: "projects" | "activities" | "events" | "site_stats"
  title: string
  fields: FieldDef[]
  orderBy?: string
  defaults?: Record<string, unknown>
}

type Row = Record<string, unknown> & { id: string }

export function ResourceEditor({
  table,
  title,
  fields,
  orderBy = "sort_order",
  defaults = {},
}: ResourceEditorProps) {
  const [rows, setRows] = useState<Row[]>([])
  const [draft, setDraft] = useState<Record<string, unknown>>({ ...defaults })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data, error: loadError } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: true })
    if (loadError) setError(loadError.message)
    setRows((data as Row[]) ?? [])
    setLoading(false)
  }, [table, orderBy])

  useEffect(() => {
    void load()
  }, [load])

  async function create() {
    setError(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: insertError } = await supabase.from(table).insert(draft as any)
    if (insertError) setError(insertError.message)
    else {
      setDraft({ ...defaults })
      await load()
    }
  }

  async function update(id: string, patch: Record<string, unknown>) {
    setError(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateError } = await supabase.from(table).update(patch as any).eq("id", id)
    if (updateError) setError(updateError.message)
    else await load()
  }

  async function remove(id: string) {
    setError(null)
    const { error: deleteError } = await supabase.from(table).delete().eq("id", id)
    if (deleteError) setError(deleteError.message)
    else await load()
  }

  function renderInput(
    field: FieldDef,
    value: unknown,
    onChange: (v: unknown) => void,
  ) {
    if (field.type === "boolean") {
      return (
        <label className="flex items-center gap-2 font-sans text-sm text-[#131626]">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          {field.label}
        </label>
      )
    }
    if (field.type === "textarea") {
      return (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder ?? field.label}
          rows={2}
          className="w-full rounded-[10px] border border-[#3343a5]/25 px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
        />
      )
    }
    return (
      <input
        type={field.type === "number" ? "number" : "text"}
        value={String(value ?? "")}
        onChange={(e) =>
          onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
        }
        placeholder={field.placeholder ?? field.label}
        className="w-full rounded-[10px] border border-[#3343a5]/25 px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
      />
    )
  }

  return (
    <section className="rounded-[15px] bg-white p-5 shadow-[0_4px_13px_rgba(19,22,38,0.12)] md:p-6">
      <h2 className="font-sans text-lg font-medium text-[#131626]">{title}</h2>

      {error && (
        <p className="mt-3 rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
          {error}
        </p>
      )}

      {/* New row */}
      <div className="mt-4 grid gap-3 rounded-[12px] bg-[#eef0ff] p-4 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name}>
            {field.type !== "boolean" && (
              <span className="mb-1 block font-sans text-xs text-[#3343a5]">
                {field.label}
              </span>
            )}
            {renderInput(field, draft[field.name], (v) =>
              setDraft((d) => ({ ...d, [field.name]: v })),
            )}
          </div>
        ))}
        <div className="md:col-span-2">
          <button
            onClick={create}
            className="rounded-[15px] bg-[#3343a5] px-5 py-2.5 font-sans text-sm font-semibold text-white"
          >
            Add new
          </button>
        </div>
      </div>

      {/* Existing rows */}
      <div className="mt-5 flex flex-col gap-4">
        {loading && <p className="font-sans text-sm text-[#3343a5]">Loading…</p>}
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid gap-3 rounded-[12px] border border-[#3343a5]/15 p-4 md:grid-cols-2"
          >
            {fields.map((field) => (
              <div key={field.name}>
                {field.type !== "boolean" && (
                  <span className="mb-1 block font-sans text-xs text-[#3343a5]">
                    {field.label}
                  </span>
                )}
                {renderInput(field, row[field.name], (v) =>
                  setRows((prev) =>
                    prev.map((r) => (r.id === row.id ? { ...r, [field.name]: v } : r)),
                  ),
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 md:col-span-2">
              <button
                onClick={() =>
                  update(
                    row.id,
                    Object.fromEntries(fields.map((f) => [f.name, row[f.name]])),
                  )
                }
                className="rounded-[15px] bg-[#131a3f] px-5 py-2 font-sans text-sm font-semibold text-white"
              >
                Save
              </button>
              <button
                onClick={() => remove(row.id)}
                className="rounded-[15px] border border-red-300 px-5 py-2 font-sans text-sm font-semibold text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
