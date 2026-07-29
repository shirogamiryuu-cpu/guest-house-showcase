"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/features/auth/auth-provider"

export default function AccountPage() {
  const { user, profile, loading, refresh } = useAuth()
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) router.replace("/login")
  }, [loading, user, router])

  useEffect(() => {
    setFullName(profile?.full_name ?? "")
    setAvatarUrl(profile?.avatar_url ?? "")
  }, [profile])

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    setError(null)
    if (!user) return
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        avatar_url: avatarUrl.trim() || null,
      })
      .eq("id", user.id)
    if (updateError) setError(updateError.message)
    else {
      setStatus("Profile updated.")
      await refresh()
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    setError(null)
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    const { error: pwError } = await supabase.auth.updateUser({ password })
    if (pwError) setError(pwError.message)
    else {
      setPassword("")
      setStatus("Password changed.")
    }
  }

  if (loading || !user) {
    return <div className="px-5 py-16 text-center font-sans text-[#3343a5]">Loading…</div>
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 md:py-14">
      <h1 className="font-sans text-2xl font-medium text-[#131626] md:text-3xl">
        My account
      </h1>
      <p className="mt-1 font-sans text-sm font-light text-[#3343a5]">{user.email}</p>

      {error && (
        <p className="mt-4 rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">{error}</p>
      )}
      {status && (
        <p className="mt-4 rounded-[10px] bg-emerald-50 px-3 py-2 font-sans text-sm text-emerald-700">{status}</p>
      )}

      <form
        onSubmit={saveProfile}
        className="mt-6 flex flex-col gap-4 rounded-[15px] bg-white p-6 shadow-[0_4px_13px_rgba(19,22,38,0.12)]"
      >
        <h2 className="font-sans text-lg font-medium text-[#131626]">Profile</h2>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          maxLength={100}
          placeholder="Full name"
          className="rounded-[10px] border border-[#3343a5]/25 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[#3343a5]"
        />
        <input
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          maxLength={500}
          placeholder="Avatar image URL"
          className="rounded-[10px] border border-[#3343a5]/25 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[#3343a5]"
        />
        <button className="self-start rounded-[15px] bg-[#3343a5] px-6 py-2.5 font-sans text-sm font-semibold text-white">
          Save profile
        </button>
      </form>

      <form
        onSubmit={changePassword}
        className="mt-6 flex flex-col gap-4 rounded-[15px] bg-white p-6 shadow-[0_4px_13px_rgba(19,22,38,0.12)]"
      >
        <h2 className="font-sans text-lg font-medium text-[#131626]">Change password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={72}
          placeholder="New password"
          className="rounded-[10px] border border-[#3343a5]/25 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[#3343a5]"
        />
        <button className="self-start rounded-[15px] bg-[#131a3f] px-6 py-2.5 font-sans text-sm font-semibold text-white">
          Update password
        </button>
      </form>
    </div>
  )
}
