"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { PROJECT_TYPES } from "../types"

interface Props {
  userId: string
  defaultName: string
  defaultEmail: string
  onDone: () => void
  onCancel: () => void
}

const inputClass =
  "w-full rounded-[10px] border border-[#3343a5]/25 bg-white px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"

export function ContractRequestForm({
  userId,
  defaultName,
  defaultEmail,
  onDone,
  onCancel,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    client_name: defaultName,
    contact_email: defaultEmail,
    project_type: PROJECT_TYPES[0] as string,
    description: "",
    amount: "",
    currency: "MMK",
    duration_months: "3",
    maintenance_months: "6",
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function submit() {
    if (!form.title.trim()) {
      setError("Please give your contract request a title.")
      return
    }
    setSaving(true)
    setError(null)
    const { error: insertError } = await supabase.from("contracts").insert({
      user_id: userId,
      title: form.title.trim(),
      client_name: form.client_name.trim(),
      contact_email: form.contact_email.trim(),
      project_type: form.project_type,
      description: form.description.trim(),
      amount: Number(form.amount) || 0,
      currency: form.currency,
      duration_months: Number(form.duration_months) || 1,
      maintenance_months: Number(form.maintenance_months) || 0,
      status: "pending",
    })
    setSaving(false)
    if (insertError) setError(insertError.message)
    else onDone()
  }

  return (
    <div className="rounded-[16px] border border-[#3343a5]/20 bg-[#eef0ff]/50 p-4 md:p-6">
      <h3 className="font-sans text-lg font-medium text-[#131626]">
        Request a new contract
      </h3>
      <p className="mt-1 font-sans text-sm text-[#3343a5]/80">
        Tell us what you need. An admin reviews the request, sets the final terms, and
        sends it back for your signature.
      </p>

      {error && (
        <p className="mt-4 rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Project title">
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Company website revamp"
          />
        </Field>
        <Field label="Project type">
          <select
            className={inputClass}
            value={form.project_type}
            onChange={(e) => set("project_type", e.target.value)}
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Your / company name">
          <input
            className={inputClass}
            value={form.client_name}
            onChange={(e) => set("client_name", e.target.value)}
          />
        </Field>
        <Field label="Contact email">
          <input
            className={inputClass}
            value={form.contact_email}
            onChange={(e) => set("contact_email", e.target.value)}
          />
        </Field>
        <Field label="Expected budget">
          <input
            type="number"
            className={inputClass}
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            placeholder="0"
          />
        </Field>
        <Field label="Currency">
          <select
            className={inputClass}
            value={form.currency}
            onChange={(e) => set("currency", e.target.value)}
          >
            <option value="MMK">MMK</option>
            <option value="USD">USD</option>
          </select>
        </Field>
        <Field label="Project duration (months)">
          <input
            type="number"
            className={inputClass}
            value={form.duration_months}
            onChange={(e) => set("duration_months", e.target.value)}
          />
        </Field>
        <Field label="Maintenance period (months)">
          <input
            type="number"
            className={inputClass}
            value={form.maintenance_months}
            onChange={(e) => set("maintenance_months", e.target.value)}
          />
        </Field>
        <div className="md:col-span-2">
          <Field label="What do you need?">
            <textarea
              rows={4}
              className={inputClass}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Scope, features, deadlines, anything the team should know."
            />
          </Field>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={submit}
          disabled={saving}
          className="rounded-[14px] bg-[#3343a5] px-5 py-2.5 font-sans text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Sending…" : "Send request"}
        </button>
        <button
          onClick={onCancel}
          className="rounded-[14px] border border-[#3343a5]/25 px-5 py-2.5 font-sans text-sm text-[#3343a5]"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-xs font-medium uppercase tracking-wide text-[#3343a5]">
        {label}
      </span>
      {children}
    </label>
  )
}
