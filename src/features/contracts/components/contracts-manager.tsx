"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useContracts, contractStats } from "../use-contracts"
import { ContractStats } from "./contract-stats"
import {
  CONTRACT_STATUSES,
  PROJECT_TYPES,
  formatDate,
  formatMoney,
  statusLabels,
  statusStyles,
  type ContractRow,
} from "../types"

const inputClass =
  "w-full rounded-[10px] border border-[#3343a5]/25 bg-white px-3 py-2 font-sans text-sm outline-none focus:border-[#3343a5]"

export function ContractsManager() {
  const { contracts, loading, error, reload } = useContracts(true)
  const [rows, setRows] = useState<Record<string, ContractRow>>({})
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [openId, setOpenId] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const stats = contractStats(contracts)

  const list = useMemo(
    () =>
      contracts.map((c) => rows[c.id] ?? c).filter((c) => {
        const matchesStatus = status === "all" || c.status === status
        const q = query.trim().toLowerCase()
        return (
          matchesStatus &&
          (!q ||
            c.title.toLowerCase().includes(q) ||
            c.client_name.toLowerCase().includes(q) ||
            c.contact_email.toLowerCase().includes(q))
        )
      }),
    [contracts, rows, status, query],
  )

  function patch(id: string, key: keyof ContractRow, value: unknown) {
    setRows((prev) => {
      const base = prev[id] ?? contracts.find((c) => c.id === id)!
      return { ...prev, [id]: { ...base, [key]: value } as ContractRow }
    })
  }

  async function save(c: ContractRow) {
    setNotice(null)
    const { error: saveError } = await supabase
      .from("contracts")
      .update({
        title: c.title,
        client_name: c.client_name,
        contact_email: c.contact_email,
        project_type: c.project_type,
        description: c.description,
        amount: Number(c.amount) || 0,
        currency: c.currency,
        duration_months: Number(c.duration_months) || 1,
        maintenance_months: Number(c.maintenance_months) || 0,
        status: c.status,
        start_date: c.start_date || null,
        end_date: c.end_date || null,
        admin_notes: c.admin_notes,
      })
      .eq("id", c.id)
    setNotice(saveError ? saveError.message : "Contract updated.")
    await reload()
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this contract? This cannot be undone.")) return
    const { error: delError } = await supabase.from("contracts").delete().eq("id", id)
    setNotice(delError ? delError.message : "Contract deleted.")
    await reload()
  }

  return (
    <section className="rounded-[18px] bg-white p-5 shadow-[0_4px_20px_rgba(19,22,38,0.10)] md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-sans text-xl font-medium text-[#131626]">Contracts</h2>
          <p className="font-sans text-sm text-[#3343a5]/70">
            {loading ? "Loading…" : `${contracts.length} request(s) from stakeholders`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-[12px] border border-[#3343a5]/20 px-3 py-2">
            <Search className="size-4 text-[#3343a5]/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-32 bg-transparent font-sans text-sm outline-none sm:w-44"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-[12px] border border-[#3343a5]/20 px-3 py-2 font-sans text-sm text-[#3343a5]"
          >
            <option value="all">All status</option>
            {CONTRACT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <ContractStats
          items={[
            { key: "total", value: stats.total, label: "Total", hint: "All time" },
            { key: "pending", value: stats.pending, label: "Pending", hint: "Needs review" },
            { key: "active", value: stats.active, label: "Active", hint: "In progress" },
            { key: "completed", value: stats.completed, label: "Completed", hint: "Finished" },
            { key: "expired", value: stats.expired, label: "Expired", hint: "Past end date" },
          ]}
        />
      </div>

      {(error || notice) && (
        <p
          className={`mt-4 rounded-[10px] px-3 py-2 font-sans text-sm ${
            error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {error ?? notice}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {!loading && list.length === 0 && (
          <p className="rounded-[12px] border border-dashed border-[#3343a5]/30 p-6 text-center font-sans text-sm text-[#3343a5]/70">
            No contract requests yet.
          </p>
        )}
        {list.map((c) => {
          const isOpen = openId === c.id
          return (
            <div key={c.id} className="overflow-hidden rounded-[14px] border border-[#3343a5]/15">
              <div className="flex flex-wrap items-center gap-3 p-3.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-sm font-semibold text-[#131626]">
                    {c.title}
                  </p>
                  <p className="truncate font-sans text-xs text-[#3343a5]/70">
                    {c.client_name || c.contact_email} · {c.project_type} ·{" "}
                    {formatMoney(Number(c.amount), c.currency)} · created{" "}
                    {formatDate(c.created_at)}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 font-sans text-xs font-medium ${
                    statusStyles[c.status] ?? statusStyles.pending
                  }`}
                >
                  {statusLabels[c.status] ?? c.status}
                </span>
                <button
                  onClick={() => setOpenId(isOpen ? null : c.id)}
                  className="rounded-[12px] border border-[#3343a5]/25 px-4 py-2 font-sans text-xs font-semibold text-[#3343a5]"
                >
                  {isOpen ? "Close" : "Review"}
                </button>
                <button
                  onClick={() => remove(c.id)}
                  className="rounded-[12px] border border-red-200 px-4 py-2 font-sans text-xs font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>

              {isOpen && (
                <div className="border-t border-[#3343a5]/12 bg-[#eef0ff]/40 p-4 md:p-5">
                  {c.description && (
                    <p className="mb-4 rounded-[10px] bg-white p-3 font-sans text-sm text-[#131626]">
                      {c.description}
                    </p>
                  )}
                  {c.signed_at && (
                    <p className="mb-4 font-sans text-sm text-emerald-700">
                      Signed by {c.signed_name} on {formatDate(c.signed_at)}
                    </p>
                  )}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Title">
                      <input
                        className={inputClass}
                        value={c.title}
                        onChange={(e) => patch(c.id, "title", e.target.value)}
                      />
                    </Field>
                    <Field label="Project type">
                      <select
                        className={inputClass}
                        value={c.project_type}
                        onChange={(e) => patch(c.id, "project_type", e.target.value)}
                      >
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Client name">
                      <input
                        className={inputClass}
                        value={c.client_name}
                        onChange={(e) => patch(c.id, "client_name", e.target.value)}
                      />
                    </Field>
                    <Field label="Contact email">
                      <input
                        className={inputClass}
                        value={c.contact_email}
                        onChange={(e) => patch(c.id, "contact_email", e.target.value)}
                      />
                    </Field>
                    <Field label="Amount">
                      <input
                        type="number"
                        className={inputClass}
                        value={String(c.amount ?? 0)}
                        onChange={(e) => patch(c.id, "amount", e.target.value)}
                      />
                    </Field>
                    <Field label="Currency">
                      <select
                        className={inputClass}
                        value={c.currency}
                        onChange={(e) => patch(c.id, "currency", e.target.value)}
                      >
                        <option value="MMK">MMK</option>
                        <option value="USD">USD</option>
                      </select>
                    </Field>
                    <Field label="Duration (months)">
                      <input
                        type="number"
                        className={inputClass}
                        value={String(c.duration_months)}
                        onChange={(e) => patch(c.id, "duration_months", e.target.value)}
                      />
                    </Field>
                    <Field label="Maintenance (months)">
                      <input
                        type="number"
                        className={inputClass}
                        value={String(c.maintenance_months)}
                        onChange={(e) => patch(c.id, "maintenance_months", e.target.value)}
                      />
                    </Field>
                    <Field label="Start date">
                      <input
                        type="date"
                        className={inputClass}
                        value={c.start_date ?? ""}
                        onChange={(e) => patch(c.id, "start_date", e.target.value)}
                      />
                    </Field>
                    <Field label="End date">
                      <input
                        type="date"
                        className={inputClass}
                        value={c.end_date ?? ""}
                        onChange={(e) => patch(c.id, "end_date", e.target.value)}
                      />
                    </Field>
                    <Field label="Status">
                      <select
                        className={inputClass}
                        value={c.status}
                        onChange={(e) => patch(c.id, "status", e.target.value)}
                      >
                        {CONTRACT_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {statusLabels[s]}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Admin note (visible to the stakeholder)">
                        <textarea
                          rows={3}
                          className={inputClass}
                          value={c.admin_notes}
                          onChange={(e) => patch(c.id, "admin_notes", e.target.value)}
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => save(c)}
                      className="rounded-[14px] bg-[#131a3f] px-5 py-2.5 font-sans text-sm font-semibold text-white"
                    >
                      Save changes
                    </button>
                    <button
                      onClick={() => save({ ...c, status: "active" })}
                      className="rounded-[14px] bg-[#3343a5] px-5 py-2.5 font-sans text-sm font-semibold text-white"
                    >
                      Approve &amp; send for signature
                    </button>
                    <button
                      onClick={() => save({ ...c, status: "rejected" })}
                      className="rounded-[14px] border border-red-200 px-5 py-2.5 font-sans text-sm font-semibold text-red-600"
                    >
                      Reject
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
