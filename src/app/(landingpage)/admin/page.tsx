"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/features/auth/auth-provider"
import { ResourceEditor } from "@/features/admin/components/resource-editor"
import { SiteContentEditor } from "@/features/admin/components/site-content-editor"
import { UsersManager } from "@/features/admin/components/users-manager"

const TABS = ["Projects", "Activities", "Events", "Stats", "Content", "Users"] as const
type Tab = (typeof TABS)[number]

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("Projects")

  useEffect(() => {
    if (loading) return
    if (!user) router.replace("/login")
    else if (!isAdmin) router.replace("/home")
  }, [loading, user, isAdmin, router])

  if (loading || !user || !isAdmin) {
    return <div className="px-5 py-16 text-center font-sans text-[#3343a5]">Loading…</div>
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-sans text-2xl font-medium text-[#131626] md:text-3xl">
          Admin dashboard
        </h1>
        <Link
          href="/account"
          className="rounded-[15px] border border-[#3343a5]/30 px-4 py-2 font-sans text-sm text-[#3343a5]"
        >
          Change password
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-[15px] px-4 py-2 font-sans text-sm ${
              tab === t ? "bg-[#3343a5] text-white" : "bg-white text-[#3343a5]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Projects" && (
          <ResourceEditor
            table="projects"
            title="Projects"
            defaults={{ title: "", description: "", image_url: "", link_url: "", credits: "", published: true, sort_order: 0 }}
            fields={[
              { name: "title", label: "Title" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "image_url", label: "Image", type: "image" },
              { name: "link_url", label: "Link URL" },
              {
                name: "credits",
                label: "Credits (names, comma separated)",
                type: "textarea",
                placeholder: "e.g. Aung Aung, May Thu, Kyaw Kyaw",
              },
              { name: "sort_order", label: "Sort order", type: "number" },
              { name: "published", label: "Published", type: "boolean" },
            ]}
          />
        )}
        {tab === "Activities" && (
          <ResourceEditor
            table="activities"
            title="Activities (kind: past / upcoming)"
            defaults={{ title: "", kind: "upcoming", image_url: "", register_url: "", sort_order: 0 }}
            fields={[
              { name: "title", label: "Title" },
              { name: "kind", label: "Kind (past/upcoming)" },
              { name: "image_url", label: "Image", type: "image" },
              { name: "register_url", label: "Register URL" },
              { name: "sort_order", label: "Sort order", type: "number" },
            ]}
          />
        )}
        {tab === "Events" && (
          <ResourceEditor
            table="events"
            title="Upcoming events"
            defaults={{ title: "", description: "", image_url: "", sort_order: 0 }}
            fields={[
              { name: "title", label: "Title" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "image_url", label: "Image", type: "image" },
              { name: "sort_order", label: "Sort order", type: "number" },
            ]}
          />
        )}
        {tab === "Stats" && (
          <ResourceEditor
            table="site_stats"
            title="Home statistics"
            defaults={{ label: "", value: "", sort_order: 0 }}
            fields={[
              { name: "value", label: "Value" },
              { name: "label", label: "Label" },
              { name: "sort_order", label: "Sort order", type: "number" },
            ]}
          />
        )}
        {tab === "Content" && <SiteContentEditor />}
        {tab === "Users" && <UsersManager />}
      </div>
    </div>
  )
}
