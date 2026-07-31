"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  FileSignature,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  Eye,
  Trash2,
} from "lucide-react"
import { useAuth } from "@/features/auth/auth-provider"
import { supabase } from "@/lib/supabase/client"
import { useContracts, contractStats } from "../use-contracts"
import { ContractStats } from "./contract-stats"
import { ContractRequestForm } from "./contract-request-form"
import {
  CONTRACT_STATUSES,
  formatDate,
  formatMoney,
  statusLabels,
  statusStyles,
  type ContractRow,
} from "../types"

const GUIDE = [
  "How contract requests work",
  "How to sign a contract",
  "Maintenance & support terms",
  "FAQs",
]

export function ContractsPage() {
  const { user, profile, isAdmin, loading: authLoading } = useAuth()
  const router = useRouter()
  const { contracts, loading, error, reload } = useContracts(Boolean(user))
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const stats = contractStats(contracts)

  const filtered = useMemo(
    () =>
      contracts.filter((c) => {
        const matchesStatus = status === "all" || c.status === status
        const q = query.trim().toLowerCase()
        const matchesQuery =
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.client_name.toLowerCase().includes(q) ||
          c.project_type.toLowerCase().includes(q)
        return matchesStatus && matchesQuery
      }),
    [contracts, status, query],
  )

  async function sign(contract: ContractRow) {
    const name = window.prompt(
      "Type your full name to sign this contract:",
      profile?.full_name ?? "",
    )
    if (!name?.trim()) return
    const { error: signError } = await supabase
      .from("contracts")
      .update({ signed_name: name.trim(), signed_at: new Date().toISOString() })
      .eq("id", contract.id)
    setNotice(signError ? signError.message : "Contract signed. Thank you!")
    await reload()
  }

  async function remove(contract: ContractRow) {
    if (!window.confirm("Withdraw this contract request?")) return
    const { error: delError } = await supabase
      .from("contracts")
      .delete()
      .eq("id", contract.id)
    setNotice(delError ? delError.message : "Request withdrawn.")
    await reload()
  }

  if (authLoading) {
    return <div className="px-5 py-16 text-center font-sans text-[#3343a5]">Loading…</div>
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-16">
        <div className="rounded-[20px] bg-white p-8 text-center shadow-[0_4px_20px_rgba(19,22,38,0.10)]">
          <FileSignature className="mx-auto size-10 text-[#3343a5]" />
          <h1 className="mt-4 font-sans text-2xl font-medium text-[#131626]">
            Digital Contracts
          </h1>
          <p className="mx-auto mt-2 max-w-md font-sans text-sm text-[#3343a5]/80">
            Sign in to request a contract for software, design, or maintenance work. Our
            admin team reviews every request and prepares the final terms for you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/login"
              className="rounded-[15px] bg-[#3343a5] px-6 py-2.5 font-sans text-sm font-semibold text-white"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-[15px] border border-[#3343a5]/30 px-6 py-2.5 font-sans text-sm text-[#3343a5]"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 md:py-12">
      <section className="rounded-[20px] bg-[#eef0ff] p-6 md:p-10">
        <h1 className="font-sans text-3xl font-semibold text-[#131626] md:text-5xl">
          Digital Contracts
        </h1>
        <p className="mt-3 max-w-xl font-sans text-sm text-[#3343a5] md:text-base">
          Create, track, and sign contracts for your projects — software, design, and
          long-term maintenance — all in one place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="rounded-[15px] bg-[#3343a5] px-6 py-3 font-sans text-sm font-semibold text-white"
          >
            {showForm ? "Close form" : "Request new contract"}
          </button>
          {isAdmin && (
            <button
              onClick={() => router.push("/admin")}
              className="rounded-[15px] bg-[#131a3f] px-6 py-3 font-sans text-sm font-semibold text-white"
            >
              Manage in admin
            </button>
          )}
        </div>
      </section>

      {showForm && (
        <div className="mt-6">
          <ContractRequestForm
            userId={user.id}
            defaultName={profile?.full_name ?? ""}
            defaultEmail={profile?.email ?? user.email ?? ""}
            onDone={async () => {
              setShowForm(false)
              setNotice("Request sent — an admin will review it shortly.")
              await reload()
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="mt-6">
        <ContractStats
          items={[
            { key: "total", value: stats.total, label: "Total Contracts", hint: "All time" },
            { key: "pending", value: stats.pending, label: "Pending", hint: "Awaiting review" },
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

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="rounded-[18px] bg-white p-4 shadow-[0_4px_20px_rgba(19,22,38,0.08)] md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-sans text-xl font-medium text-[#131626]">
              {isAdmin ? "All contracts" : "Your contracts"}
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-[12px] border border-[#3343a5]/20 px-3 py-2">
                <Search className="size-4 text-[#3343a5]/70" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search contracts…"
                  className="w-36 bg-transparent font-sans text-sm outline-none sm:w-48"
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

          <div className="mt-5 flex flex-col gap-3">
            {loading && (
              <p className="font-sans text-sm text-[#3343a5]/70">Loading contracts…</p>
            )}
            {!loading && filtered.length === 0 && (
              <p className="rounded-[12px] border border-dashed border-[#3343a5]/30 p-8 text-center font-sans text-sm text-[#3343a5]/70">
                No contracts yet — send your first request above.
              </p>
            )}
            {filtered.map((c) => {
              const isOpen = openId === c.id
              return (
                <article
                  key={c.id}
                  className="overflow-hidden rounded-[14px] border border-[#3343a5]/15"
                >
                  <div className="flex flex-wrap items-center gap-3 p-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#eef0ff] text-[#3343a5]">
                      <FileSignature className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-sans text-sm font-semibold text-[#131626]">
                        {c.title}
                      </p>
                      <p className="truncate font-sans text-xs text-[#3343a5]/70">
                        {c.project_type} · {formatMoney(Number(c.amount), c.currency)} ·{" "}
                        {c.duration_months} mo
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
                      aria-label="View contract"
                      className="rounded-[10px] border border-[#3343a5]/25 p-2 text-[#3343a5]"
                    >
                      <Eye className="size-4" />
                    </button>
                    {c.status === "pending" && (
                      <button
                        onClick={() => remove(c)}
                        aria-label="Withdraw request"
                        className="rounded-[10px] border border-red-200 p-2 text-red-600"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>

                  {isOpen && (
                    <div className="border-t border-[#3343a5]/12 bg-[#eef0ff]/40 p-4 md:p-5">
                      <dl className="grid gap-3 sm:grid-cols-2">
                        <Detail label="Client" value={c.client_name || "—"} />
                        <Detail label="Contact" value={c.contact_email || "—"} />
                        <Detail
                          label="Maintenance"
                          value={`${c.maintenance_months} month(s)`}
                        />
                        <Detail
                          label="Dates"
                          value={`${formatDate(c.start_date)} → ${formatDate(c.end_date)}`}
                        />
                      </dl>
                      {c.description && (
                        <p className="mt-3 font-sans text-sm text-[#131626]">
                          {c.description}
                        </p>
                      )}
                      {c.admin_notes && (
                        <p className="mt-3 rounded-[10px] bg-white p-3 font-sans text-sm text-[#3343a5]">
                          <strong>Admin note:</strong> {c.admin_notes}
                        </p>
                      )}
                      <div className="mt-4">
                        {c.signed_at ? (
                          <p className="flex items-center gap-2 font-sans text-sm text-emerald-700">
                            <ShieldCheck className="size-4" />
                            Signed by {c.signed_name} on {formatDate(c.signed_at)}
                          </p>
                        ) : c.status === "active" || c.status === "completed" ? (
                          <button
                            onClick={() => sign(c)}
                            className="rounded-[14px] bg-[#3343a5] px-5 py-2.5 font-sans text-sm font-semibold text-white"
                          >
                            Sign contract
                          </button>
                        ) : (
                          <p className="font-sans text-sm text-[#3343a5]/70">
                            Waiting for the admin to approve the terms before signing.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-[18px] bg-white p-5 shadow-[0_4px_20px_rgba(19,22,38,0.08)]">
            <h3 className="font-sans text-base font-semibold text-[#131626]">
              Need help deciding?
            </h3>
            <p className="mt-2 font-sans text-sm text-[#3343a5]/80">
              Not sure about scope or budget? Send a request with what you know — the
              admin team will refine the terms with you.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 w-full rounded-[12px] bg-[#3343a5] px-4 py-2.5 font-sans text-sm font-semibold text-white"
            >
              Start a request
            </button>
          </div>
          <div className="rounded-[18px] bg-white p-5 shadow-[0_4px_20px_rgba(19,22,38,0.08)]">
            <h3 className="font-sans text-base font-semibold text-[#131626]">
              Quick guide
            </h3>
            <ul className="mt-3 flex flex-col">
              {GUIDE.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 border-b border-[#3343a5]/10 py-2.5 font-sans text-sm text-[#131626] last:border-0"
                >
                  <HelpCircle className="size-4 shrink-0 text-[#3343a5]" />
                  <span className="flex-1">{item}</span>
                  <ChevronRight className="size-4 text-[#3343a5]/50" />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-xs font-medium uppercase tracking-wide text-[#3343a5]">
        {label}
      </dt>
      <dd className="font-sans text-sm text-[#131626]">{value}</dd>
    </div>
  )
}
