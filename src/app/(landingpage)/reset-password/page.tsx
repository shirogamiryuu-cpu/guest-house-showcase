"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    setBusy(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setBusy(false)
    if (updateError) {
      setError(updateError.message)
      return
    }
    setMessage("Password updated. Redirecting…")
    setTimeout(() => router.push("/home"), 1200)
  }

  return (
    <div className="mx-auto w-full max-w-md px-5 py-12 md:py-16">
      <div className="rounded-[15px] bg-white p-6 shadow-[0_4px_13px_rgba(19,22,38,0.12)] md:p-8">
        <h1 className="font-sans text-2xl font-medium text-[#131626]">
          Set a new password
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={72}
            placeholder="New password"
            className="rounded-[10px] border border-[#3343a5]/25 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[#3343a5]"
          />
          {error && (
            <p className="rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-[10px] bg-emerald-50 px-3 py-2 font-sans text-sm text-emerald-700">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="rounded-[15px] bg-[#3343a5] px-6 py-3 font-sans text-base font-semibold text-white disabled:opacity-60"
          >
            {busy ? "Saving…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  )
}
