"use client"

import { useCallback, useRef, useState } from "react"
import { supabase } from "@/lib/supabase/client"

interface ImageDropzoneProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageDropzone({ value, onChange, label = "Image" }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(
    async (file: File) => {
      setError(null)
      setBusy(true)
      try {
        const { data } = await supabase.auth.getSession()
        const body = new FormData()
        body.append("file", file)
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: data.session ? { Authorization: `Bearer ${data.session.access_token}` } : undefined,
          body,
        })
        const json = (await res.json()) as { url?: string; error?: string }
        if (!res.ok || !json.url) throw new Error(json.error ?? "Upload failed")
        onChange(json.url)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed")
      } finally {
        setBusy(false)
      }
    },
    [onChange],
  )

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
          const file = e.dataTransfer.files?.[0]
          if (file) void upload(file)
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
        }}
        className={`flex cursor-pointer items-center gap-4 rounded-[14px] border-2 border-dashed p-3 transition-colors ${
          dragging ? "border-[#3343a5] bg-[#3343a5]/8" : "border-[#3343a5]/30 bg-[#eef0ff]/60 hover:border-[#3343a5]/60"
        }`}
      >
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="size-full object-cover" />
          ) : (
            <span className="font-sans text-[10px] text-[#3343a5]/60">No image</span>
          )}
        </div>
        <div className="min-w-0 font-sans text-sm text-[#131626]">
          <p className="font-medium">
            {busy ? "Uploading…" : dragging ? "Drop the image here" : "Drag & drop an image"}
          </p>
          <p className="text-xs text-[#3343a5]/80">or click to browse · PNG, JPG, WEBP, GIF · max 10MB</p>
          {value && <p className="mt-1 truncate text-xs text-[#3343a5]/60">{value}</p>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void upload(file)
          e.target.value = ""
        }}
      />

      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL"
          className="w-full rounded-[10px] border border-[#3343a5]/25 bg-white px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="shrink-0 rounded-[10px] border border-[#3343a5]/25 px-3 py-2 font-sans text-xs text-[#3343a5]"
          >
            Clear
          </button>
        )}
      </div>

      {error && <p className="font-sans text-xs text-red-600">{error}</p>}
    </div>
  )
}
