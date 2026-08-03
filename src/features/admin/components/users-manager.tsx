"use client"

import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type { PendingSignupRow } from "@/integrations/supabase/content-types"

interface UserRow {
  id: string
  email: string | null
  full_name: string | null
  isAdmin: boolean
}

export function UsersManager() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [pending, setPending] = useState<PendingSignupRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const [{ data: profiles, error: profilesError }, { data: roles }, { data: pendingRows }] =
      await Promise.all([
        supabase.from("profiles").select("id, email, full_name").order("created_at"),
        supabase.from("user_roles").select("user_id, role"),
        supabase.from("pending_signups").select("*").order("created_at"),
      ])
    if (profilesError) setError(profilesError.message)
    const adminIds = new Set(
      (roles ?? []).filter((r) => r.role === "admin").map((r) => r.user_id),
    )
    setUsers(
      (profiles ?? []).map((p) => ({
        id: p.id,
        email: p.email,
        full_name: p.full_name,
        isAdmin: adminIds.has(p.id),
      })),
    )
    setPending(pendingRows ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [load])

  async function acceptPending(p: PendingSignupRow) {
    setError(null)
    const { error } = await supabase.rpc("approve_pending_signup", { _pending_id: p.id })
    if (error) setError(error.message)
    await load()
  }

  async function rejectPending(p: PendingSignupRow) {
    setError(null)
    const { error: delError } = await supabase.from("pending_signups").delete().eq("id", p.id)
    if (delError) setError(delError.message)
    await load()
  }

  async function deleteUser(user: UserRow) {
    if (!window.confirm(`Are you going to remove ${user.full_name || user.email}?`)) return
    setError(null)
    const { error } = await supabase.rpc("delete_user", { _user_id: user.id })
    if (error) setError(error.message)
    await load()
  }

  async function toggleAdmin(user: UserRow) {
    setError(null)
    if (user.isAdmin) {
      const { error: delError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", user.id)
        .eq("role", "admin")
      if (delError) setError(delError.message)
    } else {
      const { error: insError } = await supabase
        .from("user_roles")
        .insert({ user_id: user.id, role: "admin" })
      if (insError) setError(insError.message)
    }
    await load()
  }

  return (
    <div className="flex flex-col gap-6">
      {pending.length > 0 && (
        <section className="rounded-[15px] bg-white p-5 shadow-[0_4px_13px_rgba(19,22,38,0.12)] md:p-6">
          <h2 className="font-sans text-lg font-medium text-[#131626]">Pending sign-ups</h2>
          <div className="mt-4 flex flex-col divide-y divide-[#3343a5]/10">
            {pending.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-sans text-sm text-[#131626]">{p.full_name || "—"}</p>
                  <p className="font-sans text-xs text-[#3343a5]">{p.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => acceptPending(p)}
                    className="rounded-[15px] bg-[#3343a5] px-4 py-2 font-sans text-sm font-semibold text-white"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectPending(p)}
                    className="rounded-[15px] border border-[#3343a5] px-4 py-2 font-sans text-sm font-semibold text-[#3343a5]"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-[15px] bg-white p-5 shadow-[0_4px_13px_rgba(19,22,38,0.12)] md:p-6">
      <h2 className="font-sans text-lg font-medium text-[#131626]">Users</h2>
      {error && (
        <p className="mt-3 rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">{error}</p>
      )}
      {loading && <p className="mt-3 font-sans text-sm text-[#3343a5]">Loading…</p>}
      <div className="mt-4 flex flex-col divide-y divide-[#3343a5]/10">
        {users.map((user) => (
          <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <p className="font-sans text-sm text-[#131626]">
                {user.full_name || "—"}
              </p>
              <p className="font-sans text-xs text-[#3343a5]">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleAdmin(user)}
                className={`rounded-[15px] px-4 py-2 font-sans text-sm font-semibold ${
                  user.isAdmin
                    ? "border border-[#3343a5] text-[#3343a5]"
                    : "bg-[#3343a5] text-white"
                }`}
              >
                {user.isAdmin ? "Remove admin" : "Make admin"}
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="rounded-[15px] border border-red-600 px-4 py-2 font-sans text-sm font-semibold text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      </section>
    </div>
  )
}
