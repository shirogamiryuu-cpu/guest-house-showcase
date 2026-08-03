"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { ImageDropzone } from "./image-dropzone"
import { GalleryDropzone } from "./gallery-dropzone"

export type FieldType = "text" | "textarea" | "number" | "boolean" | "image" | "gallery"


export interface FieldDef {
  name: string
  label: string
  type?: FieldType
  placeholder?: string
}

interface ResourceEditorProps {
  table: "projects" | "activities" | "events" | "site_stats" | "products"
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
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  async function create() {
    setError(null)
    setStatus(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: insertError } = await supabase.from(table).insert(draft as any)
    if (insertError) setError(insertError.message)
    else {
      setDraft({ ...defaults })
      setShowNew(false)
      setStatus("Item added.")
      await load()
    }
  }

  async function update(id: string, patch: Record<string, unknown>) {
    setError(null)
    setStatus(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: updateError } = await supabase.from(table).update(patch as any).eq("id", id)
    if (updateError) setError(updateError.message)
    else {
      setStatus("Changes saved.")
      await load()
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this item? This cannot be undone.")) return
    setError(null)
    setStatus(null)
    const { error: deleteError } = await supabase.from(table).delete().eq("id", id)
    if (deleteError) setError(deleteError.message)
    else {
      setStatus("Item deleted.")
      await load()
    }
  }

  function renderField(field: FieldDef, value: unknown, onChange: (v: unknown) => void) {
    if (field.type === "image") {
      return (
        <ImageDropzone
          label={field.label}
          value={String(value ?? "")}
          onChange={(url) => onChange(url)}
        />
      )
    }
    if (field.type === "boolean") {
      return (
        <label className="flex h-full items-center gap-3 rounded-[12px] border border-[#3343a5]/20 bg-white px-3 py-2.5 font-sans text-sm text-[#131626]">
          <input
            type="checkbox"
            className="size-4 accent-[#3343a5]"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          {field.label}
        </label>
      )
    }
    return (
      <div className="flex flex-col gap-1.5">
        <span className="font-sans text-xs font-medium uppercase tracking-wide text-[#3343a5]">
          {field.label}
        </span>
        {field.type === "textarea" ? (
          <textarea
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder ?? field.label}
            rows={3}
            className="w-full rounded-[10px] border border-[#3343a5]/25 bg-white px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
          />
        ) : (
          <input
            type={field.type === "number" ? "number" : "text"}
            value={String(value ?? "")}
            onChange={(e) =>
              onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
            }
            placeholder={field.placeholder ?? field.label}
            className="w-full rounded-[10px] border border-[#3343a5]/25 bg-white px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
          />
        )}
      </div>
    )
  }

  function fieldGrid(
    source: Record<string, unknown>,
    onChange: (name: string, v: unknown) => void,
  ) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" || field.type === "image" ? "md:col-span-2" : ""}
          >
            {renderField(field, source[field.name], (v) => onChange(field.name, v))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="rounded-[18px] bg-white p-5 shadow-[0_4px_20px_rgba(19,22,38,0.10)] md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-sans text-xl font-medium text-[#131626]">{title}</h2>
          <p className="font-sans text-sm text-[#3343a5]/70">
            {loading ? "Loading…" : `${rows.length} item${rows.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <button
          onClick={() => setShowNew((s) => !s)}
          className="rounded-[14px] bg-[#3343a5] px-5 py-2.5 font-sans text-sm font-semibold text-white"
        >
          {showNew ? "Cancel" : "+ Add new"}
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">{error}</p>
      )}
      {status && (
        <p className="mt-4 rounded-[10px] bg-emerald-50 px-3 py-2 font-sans text-sm text-emerald-700">
          {status}
        </p>
      )}

      {showNew && (
        <div className="mt-5 rounded-[14px] border border-[#3343a5]/20 bg-[#eef0ff]/50 p-4 md:p-5">
          {fieldGrid(draft, (name, v) => setDraft((d) => ({ ...d, [name]: v })))}
          <div className="mt-4 flex gap-2">
            <button
              onClick={create}
              className="rounded-[14px] bg-[#3343a5] px-5 py-2.5 font-sans text-sm font-semibold text-white"
            >
              Save item
            </button>
            <button
              onClick={() => {
                setDraft({ ...defaults })
                setShowNew(false)
              }}
              className="rounded-[14px] border border-[#3343a5]/25 px-5 py-2.5 font-sans text-sm text-[#3343a5]"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {!loading && rows.length === 0 && (
          <p className="rounded-[12px] border border-dashed border-[#3343a5]/30 p-6 text-center font-sans text-sm text-[#3343a5]/70">
            Nothing here yet — add your first item.
          </p>
        )}
        {rows.map((row) => {
          const imageField = fields.find((f) => f.type === "image")
          const imageUrl = imageField ? String(row[imageField.name] ?? "") : ""
          const heading = String(row.title ?? row.label ?? row.value ?? "Untitled")
          const isOpen = openId === row.id
          return (
            <div
              key={row.id}
              className="overflow-hidden rounded-[14px] border border-[#3343a5]/15 bg-white"
            >
              <div className="flex items-center gap-3 p-3">
                <div className="size-14 shrink-0 overflow-hidden rounded-[10px] bg-[#eef0ff]">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageUrl} alt={heading} className="size-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-sm font-medium text-[#131626]">{heading}</p>
                  <p className="truncate font-sans text-xs text-[#3343a5]/70">
                    {String(row.description ?? row.kind ?? row.label ?? "")}
                  </p>
                </div>
                <button
                  onClick={() => setOpenId(isOpen ? null : row.id)}
                  className="rounded-[12px] border border-[#3343a5]/25 px-4 py-2 font-sans text-xs font-semibold text-[#3343a5]"
                >
                  {isOpen ? "Close" : "Edit"}
                </button>
                <button
                  onClick={() => remove(row.id)}
                  className="rounded-[12px] border border-red-200 px-4 py-2 font-sans text-xs font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>

              {isOpen && (
                <div className="border-t border-[#3343a5]/12 bg-[#eef0ff]/40 p-4 md:p-5">
                  {fieldGrid(row, (name, v) =>
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, [name]: v } : r))),
                  )}
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        update(row.id, Object.fromEntries(fields.map((f) => [f.name, row[f.name]])))
                      }
                      className="rounded-[14px] bg-[#131a3f] px-5 py-2.5 font-sans text-sm font-semibold text-white"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
