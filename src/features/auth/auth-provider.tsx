"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  phone: string | null
  birthday: string | null
  gender: string | null
  bio: string | null
  city: string | null
  country: string | null
  website: string | null
}

interface AuthContextValue {
  user: User | null
  session: Session | null
  profile: Profile | null
  isAdmin: boolean
  loading: boolean
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadDetails = useCallback(async (userId: string | undefined) => {
    if (!userId) {
      setProfile(null)
      setIsAdmin(false)
      return
    }
    const [{ data: profileData }, { data: roleData }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, email, full_name, avatar_url")
        .eq("id", userId)
        .maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ])
    setProfile((profileData as Profile) ?? null)
    setIsAdmin(Boolean(roleData?.some((r) => r.role === "admin")))
  }, [])

  useEffect(() => {
    let active = true

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!active) return
        setSession(nextSession)
        // Avoid deadlocks: defer supabase calls out of the callback.
        setTimeout(() => {
          void loadDetails(nextSession?.user?.id)
        }, 0)
      },
    )

    void supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      setSession(data.session)
      await loadDetails(data.session?.user?.id)
      setLoading(false)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [loadDetails])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      profile,
      isAdmin,
      loading,
      signOut: async () => {
        await supabase.auth.signOut()
        setProfile(null)
        setIsAdmin(false)
      },
      refresh: async () => {
        const { data } = await supabase.auth.getSession()
        setSession(data.session)
        await loadDetails(data.session?.user?.id)
      },
    }),
    [session, profile, isAdmin, loading, loadDetails],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
