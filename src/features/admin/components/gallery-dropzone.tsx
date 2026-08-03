"use client"

import { useCallback, useRef, useState } from "react"
import { supabase } from "@/lib/supabase/client"

interface GalleryDropzoneProps {
  value: string[]
  onChange: (urls: string[]) => void
  label?: string
}

export function GalleryDropzone({ value, onChange, label = "Gallery" }: GalleryDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [manual, setManual] = useState("")

  const uploadMany = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return
      setError(null)
      setBusy(true)
      try {
        const { data } = await supabase.auth.getSession()
        const uploaded: string[] = []
        for (const file of files) {
          const body = new FormData()
          body.append("file", file)
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: data.session ? { Authorization: `Bearer ${data.session.access_token}` } : undefined,
            body,
          })
          const json = (await res.json()) as { url?: string; error?: string }
          if (!res.ok || !json.url) throw new Error(json.error ?? "Upload failed")
          uploaded.push(json.url)
        }
        onChange([...value, ...uploaded])
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed")
      } finally {
        setBusy(false)
      }
    },
    [onChange, value],
  )

  function move(index: number, delta: number) {
    const next = [...value]
    const target = index + delta
    if (target < 0 || target >= next.length) return
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-xs font-medium uppercase tracking-wide text-[#3343a5]">
        {label}
      </span>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          void uploadMany(Array.from(e.dataTransfer.files ?? []))
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
        }}
        className={`cursor-pointer rounded-[14px] border-2 border-dashed p-4 text-center transition-colors ${
          dragging
            ? "border-[#3343a5] bg-[#3343a5]/8"
            : "border-[#3343a5]/30 bg-[#eef0ff]/60 hover:border-[#3343a5]/60"
        }`}
      >
        <p className="font-sans text-sm font-medium text-[#131626]">
          {busy ? "Uploading…" : dragging ? "Drop images here" : "Drag & drop images (multiple)"}
        </p>
        <p className="font-sans text-xs text-[#3343a5]/80">
          or click to browse · PNG, JPG, WEBP, GIF · max 10MB each
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          void uploadMany(Array.from(e.target.files ?? []))
          e.target.value = ""
        }}
      />

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
          {value.map((url, index) => (
            <div key={`${url}-${index}`} className="overflow-hidden rounded-[10px] border border-[#3343a5]/20 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Gallery ${index + 1}`} className="h-20 w-full object-cover" />
              <div className="flex items-center justify-between gap-1 p-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  className="px-1 font-sans text-xs text-[#3343a5]"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                  className="px-1 font-sans text-xs text-red-600"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  className="px-1 font-sans text-xs text-[#3343a5]"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder="…or paste an image URL"
          className="w-full rounded-[10px] border border-[#3343a5]/25 bg-white px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
        />
        <button
          type="button"
          onClick={() => {
            if (!manual.trim()) return
            onChange([...value, manual.trim()])
            setManual("")
          }}
          className="shrink-0 rounded-[10px] border border-[#3343a5]/25 px-3 py-2 font-sans text-xs text-[#3343a5]"
        >
          Add
        </button>
      </div>

      {error && <p className="font-sans text-xs text-red-600">{error}</p>}
    </div>
  )
}
