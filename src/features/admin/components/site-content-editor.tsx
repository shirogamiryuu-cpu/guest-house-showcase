"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { ImageDropzone } from "./image-dropzone"
import {
  CONTENT_DEFAULTS,
  CONTENT_GROUPS,
  type ContentField,
} from "@/integrations/supabase/content-schema"

export function SiteContentEditor() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [savingGroup, setSavingGroup] = useState<string | null>(null)
  const [openGroup, setOpenGroup] = useState<string>(CONTENT_GROUPS[0]?.title ?? "")

  const load = useCallback(async () => {
    const { data, error: loadError } = await supabase.from("site_content").select("key, value")
    if (loadError) setError(loadError.message)
    const map: Record<string, string> = { ...CONTENT_DEFAULTS }
    for (const row of data ?? []) map[row.key] = row.value
    setValues(map)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  function set(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function saveGroup(title: string, fields: ContentField[]) {
    setError(null)
    setStatus(null)
    setSavingGroup(title)
    const payload = fields.map((f) => ({ key: f.key, value: values[f.key] ?? "" }))
    const { error: saveError } = await supabase
      .from("site_content")
      .upsert(payload, { onConflict: "key" })
    setSavingGroup(null)
    if (saveError) setError(saveError.message)
    else setStatus(`Saved “${title}”.`)
  }

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-sans text-lg font-medium text-[#131626]">Website text & images</h2>
        <p className="mt-1 font-sans text-sm text-[#3343a5]/80">
          Edit every heading, paragraph and image shown on the public pages.
        </p>
      </div>

      {error && (
        <p className="rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">{error}</p>
      )}
      {status && (
        <p className="rounded-[10px] bg-emerald-50 px-3 py-2 font-sans text-sm text-emerald-700">
          {status}
        </p>
      )}

      {CONTENT_GROUPS.map((group) => {
        const open = openGroup === group.title
        return (
          <div
            key={group.title}
            className="overflow-hidden rounded-[15px] bg-white shadow-[0_4px_13px_rgba(19,22,38,0.12)]"
          >
            <button
              onClick={() => setOpenGroup(open ? "" : group.title)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-sans text-base font-medium text-[#131626]">{group.title}</span>
              <span className="font-sans text-sm text-[#3343a5]">{open ? "Hide" : "Edit"}</span>
            </button>

            {open && (
              <div className="border-t border-[#3343a5]/10 p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {group.fields.map((field) => (
                    <div
                      key={field.key}
                      className={`flex flex-col gap-1.5 ${
                        field.type === "textarea" || field.type === "image" ? "md:col-span-2" : ""
                      }`}
                    >
                      {field.type === "image" ? (
                        <ImageDropzone
                          label={field.label}
                          value={values[field.key] ?? ""}
                          onChange={(url) => set(field.key, url)}
                        />
                      ) : (
                        <>
                          <label
                            htmlFor={field.key}
                            className="font-sans text-xs font-medium uppercase tracking-wide text-[#3343a5]"
                          >
                            {field.label}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              id={field.key}
                              rows={3}
                              value={values[field.key] ?? ""}
                              onChange={(e) => set(field.key, e.target.value)}
                              className="rounded-[10px] border border-[#3343a5]/25 px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
                            />
                          ) : (
                            <input
                              id={field.key}
                              value={values[field.key] ?? ""}
                              onChange={(e) => set(field.key, e.target.value)}
                              className="rounded-[10px] border border-[#3343a5]/25 px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
                            />
                          )}
                          {field.help && (
                            <span className="font-sans text-xs text-[#3343a5]/70">{field.help}</span>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => saveGroup(group.title, group.fields)}
                  disabled={savingGroup === group.title}
                  className="mt-5 rounded-[15px] bg-[#131a3f] px-6 py-2.5 font-sans text-sm font-semibold text-white disabled:opacity-60"
                >
                  {savingGroup === group.title ? "Saving…" : "Save section"}
                </button>
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}
