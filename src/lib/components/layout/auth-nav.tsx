"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, ShieldCheck } from "lucide-react"
import { useAuth } from "@/features/auth/auth-provider"

export function AuthNav({ onNavigate }: { onNavigate?: () => void }) {
  const { user, profile, isAdmin, loading, signOut } = useAuth()
  const router = useRouter()

  if (loading) {
    return <div className="h-10 w-32 animate-pulse rounded-[15px] bg-[#3343a5]/15" />
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2.5">
        <Link
          href="/signup"
          onClick={onNavigate}
          className="block rounded-[15px] bg-[#3343a5] px-5.5 py-2.5 text-center font-sans text-[16px] font-light leading-none text-white"
        >
          sign up
        </Link>
        <Link
          href="/login"
          onClick={onNavigate}
          className="block rounded-[15px] bg-[#3343a5] px-6.5 py-2.5 text-center font-sans text-[16px] font-light leading-none text-white"
        >
          log in
        </Link>
      </div>
    )
  }

  const name = profile?.full_name || user.email?.split("@")[0] || "Account"

  return (
    <div className="flex items-center gap-2.5">
      {isAdmin && (
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-1.5 rounded-[15px] bg-[#131a3f] px-4 py-2.5 font-sans text-sm font-light leading-none text-white"
        >
          <ShieldCheck className="size-4" />
          Admin
        </Link>
      )}
      <Link
        href="/account"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-[15px] border border-[#3343a5]/25 px-3.5 py-2 font-sans text-sm text-[#3343a5]"
      >
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt=""
            className="size-6 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-6 items-center justify-center rounded-full bg-[#3343a5] text-xs text-white">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="max-w-24 truncate">{name}</span>
      </Link>
      <button
        type="button"
        onClick={async () => {
          onNavigate?.()
          await signOut()
          router.push("/home")
          router.refresh()
        }}
        aria-label="Log out"
        className="flex items-center justify-center rounded-[15px] bg-[#3343a5] p-2.5 text-white"
      >
        <LogOut className="size-4" />
      </button>
    </div>
  )
}
