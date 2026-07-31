"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { lovable } from "@/integrations/lovable"
import { useAuth } from "../auth-provider"

interface AuthFormProps {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { refresh } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [googleBusy, setGoogleBusy] = useState(false)

  const isSignup = mode === "signup"

  async function handleGoogle() {
    setError(null)
    setNotice(null)
    setGoogleBusy(true)
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      })
      if (result.error) {
        setError(result.error.message || "Google sign-in failed.")
        return
      }
      if (result.redirected) return
      await refresh()
      const { data: session } = await supabase.auth.getSession()
      const userId = session.session?.user.id
      let admin = false
      if (userId) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
        admin = Boolean(roles?.some((r) => r.role === "admin"))
      }
      router.push(admin ? "/admin" : "/home")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.")
    } finally {
      setGoogleBusy(false)
    }
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)

    if (!email.trim() || password.length < 6) {
      setError("Enter a valid email and a password of at least 6 characters.")
      return
    }

    setBusy(true)
    try {
      if (isSignup) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName.trim() || email.split("@")[0] },
          },
        })
        if (signUpError) throw signUpError
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (signInError) throw signInError
      }

      await refresh()
      const { data: session } = await supabase.auth.getSession()
      const userId = session.session?.user.id
      let admin = false
      if (userId) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
        admin = Boolean(roles?.some((r) => r.role === "admin"))
      }
      router.push(admin ? "/admin" : "/home")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setBusy(false)
    }
  }

  async function handleForgotPassword() {
    setError(null)
    setNotice(null)
    if (!email.trim()) {
      setError("Enter your email first, then click reset.")
      return
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${window.location.origin}/reset-password` },
    )
    if (resetError) setError(resetError.message)
    else setNotice("Password reset link sent. Check your inbox.")
  }

  return (
    <div className="mx-auto w-full max-w-md px-5 py-12 md:py-16">
      <div className="rounded-[15px] bg-white p-6 shadow-[0_4px_13px_rgba(19,22,38,0.12)] md:p-8">
        <h1 className="font-sans text-2xl font-medium text-[#131626] md:text-3xl">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 font-sans text-sm font-light text-[#3343a5]">
          {isSignup
            ? "Join YOUTHs to register for events and activities."
            : "Log in to continue to YOUTHs."}
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleBusy}
          className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-[15px] border border-[#3343a5]/25 bg-white px-6 py-3 font-sans text-base font-medium text-[#131626] transition-colors hover:bg-[#eef0ff] disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.39 3.62v3h3.86c2.26-2.09 3.58-5.17 3.58-8.86Z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.86-3c-1.08.72-2.45 1.16-4.08 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z" />
            <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z" />
          </svg>
          {googleBusy ? "Connecting…" : "Continue with Google"}
        </button>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#3343a5]/15" />
          <span className="font-sans text-xs uppercase tracking-wide text-[#3343a5]/70">or</span>
          <span className="h-px flex-1 bg-[#3343a5]/15" />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {isSignup && (
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-sm text-[#131626]">Full name</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={100}
                className="rounded-[10px] border border-[#3343a5]/25 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[#3343a5]"
                placeholder="Jane Doe"
              />
            </label>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-sm text-[#131626]">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              className="rounded-[10px] border border-[#3343a5]/25 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[#3343a5]"
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-sans text-sm text-[#131626]">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={72}
              className="rounded-[10px] border border-[#3343a5]/25 px-3.5 py-2.5 font-sans text-sm outline-none focus:border-[#3343a5]"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="rounded-[10px] bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
              {error}
            </p>
          )}
          {notice && (
            <p className="rounded-[10px] bg-emerald-50 px-3 py-2 font-sans text-sm text-emerald-700">
              {notice}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="rounded-[15px] bg-linear-to-r from-[#131a3f] to-[#3343a5] px-6 py-3 font-sans text-base font-semibold text-[#eef0ff] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <div className="mt-5 flex flex-col gap-2 font-sans text-sm text-[#3343a5]">
          {!isSignup && (
            <button
              type="button"
              onClick={handleForgotPassword}
              className="self-start underline underline-offset-2"
            >
              Forgot password?
            </button>
          )}
          {isSignup ? (
            <span>
              Already have an account?{" "}
              <Link href="/login" className="font-medium underline underline-offset-2">
                Log in
              </Link>
            </span>
          ) : (
            <span>
              New here?{" "}
              <Link href="/signup" className="font-medium underline underline-offset-2">
                Create an account
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
