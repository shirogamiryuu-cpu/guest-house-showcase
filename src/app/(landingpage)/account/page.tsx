"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/features/auth/auth-provider"
import { ImageDropzone } from "@/features/admin/components/image-dropzone"

interface ProfileForm {
  full_name: string
  avatar_url: string
  phone: string
  birthday: string
  gender: string
  bio: string
  city: string
  country: string
  website: string
}

const EMPTY: ProfileForm = {
  full_name: "",
  avatar_url: "",
  phone: "",
  birthday: "",
  gender: "",
  bio: "",
  city: "",
  country: "",
  website: "",
}

const inputClass =
  "rounded-[10px] border border-[#3343a5]/25 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[#3343a5]"

export default function AccountPage() {
  const { user, profile, isAdmin, loading, refresh } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState<ProfileForm>(EMPTY)
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) router.replace("/login")
  }, [loading, user, router])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      full_name: profile?.full_name ?? "",
      avatar_url: profile?.avatar_url ?? "",
      phone: profile?.phone ?? "",
      birthday: profile?.birthday ?? "",
      gender: profile?.gender ?? "",
      bio: profile?.bio ?? "",
      city: profile?.city ?? "",
      country: profile?.country ?? "",
      website: profile?.website ?? "",
    })
  }, [profile])

  function set<K extends keyof ProfileForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    setError(null)
    if (!user) return
    if (form.phone && !/^[0-9+()\-\s]{6,20}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.")
      return
    }
    const clean = (v: string) => (v.trim() ? v.trim() : null)
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: clean(form.full_name),
        avatar_url: clean(form.avatar_url),
        phone: clean(form.phone),
        birthday: form.birthday ? form.birthday : null,
        gender: clean(form.gender),
        bio: clean(form.bio),
        city: clean(form.city),
        country: clean(form.country),
        website: clean(form.website),
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
      <div className="flex items-center gap-4">
        {form.avatar_url ? (
          <img
            src={form.avatar_url}
            alt=""
            className="size-16 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-full bg-[#3343a5] text-xl font-semibold text-white">
            {(form.full_name || user.email || "?").charAt(0).toUpperCase()}
          </span>
        )}
        <div>
          <h1 className="font-sans text-2xl font-medium text-[#131626] md:text-3xl">
            {form.full_name || "My account"}
          </h1>
          <p className="mt-1 font-sans text-sm font-light text-[#3343a5]">
            {user.email}
            {isAdmin && " · Admin"}
          </p>
        </div>
      </div>

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

        <ImageDropzone
          label="Profile picture"
          value={form.avatar_url}
          onChange={(url) => set("avatar_url", url)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-medium text-[#3343a5]">Full name</span>
            <input
              value={form.full_name}
              onChange={(e) => set("full_name", e.target.value)}
              maxLength={100}
              placeholder="Full name"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-medium text-[#3343a5]">Phone number</span>
            <input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              maxLength={20}
              placeholder="+95 9 123 456 789"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-medium text-[#3343a5]">Birthday</span>
            <input
              type="date"
              value={form.birthday}
              onChange={(e) => set("birthday", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-medium text-[#3343a5]">Gender</span>
            <select
              value={form.gender}
              onChange={(e) => set("gender", e.target.value)}
              className={inputClass}
            >
              <option value="">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-medium text-[#3343a5]">City</span>
            <input
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              maxLength={80}
              placeholder="Yangon"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-xs font-medium text-[#3343a5]">Country</span>
            <input
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              maxLength={80}
              placeholder="Myanmar"
              className={inputClass}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="font-sans text-xs font-medium text-[#3343a5]">Website / social link</span>
          <input
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
            maxLength={300}
            placeholder="https://…"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-sans text-xs font-medium text-[#3343a5]">Bio</span>
          <textarea
            value={form.bio}
            onChange={(e) => set("bio", e.target.value)}
            maxLength={500}
            rows={4}
            placeholder="A short introduction…"
            className={inputClass}
          />
        </label>

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
          className={inputClass}
        />
        <button className="self-start rounded-[15px] bg-[#131a3f] px-6 py-2.5 font-sans text-sm font-semibold text-white">
          Update password
        </button>
      </form>
    </div>
  )
}
