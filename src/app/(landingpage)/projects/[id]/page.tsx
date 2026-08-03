"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useProject } from "@/integrations/supabase/use-content"

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: project, loading } = useProject(id)

  if (loading) {
    return <div className="px-5 py-16 text-center font-sans text-[#3343a5]">Loading…</div>
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center gap-4 px-5 py-16 text-center">
        <p className="font-sans text-lg text-[#131a3f]">Project not found.</p>
        <Link href="/projects" className="font-sans text-sm text-[#3343a5] underline">
          Back to projects
        </Link>
      </div>
    )
  }

  const credits = (project.credits ?? "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean)
  const gallery = project.gallery ?? []

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 py-10 md:px-8 md:py-14">
      <Link href="/projects" className="flex w-fit items-center gap-1.5 font-sans text-sm text-[#3343a5]">
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <div className="relative aspect-620.5/405 w-full overflow-hidden shadow-[0px_4px_4px_0px_#131626]">
        <img
          src={project.image_url || "/Bwtnd.png"}
          alt={project.title}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="font-sans text-3xl font-normal text-[#131a3f] md:text-4xl">{project.title}</h1>
        {project.description && (
          <p className="whitespace-pre-line font-sans text-base text-[#424243]">{project.description}</p>
        )}
        {project.detail && (
          <p className="whitespace-pre-line font-sans text-base leading-relaxed text-[#131626]">
            {project.detail}
          </p>
        )}
        {project.link_url && (
          <a
            href={project.link_url}
            target="_blank"
            rel="noreferrer"
            className="w-fit rounded-[14px] bg-[#3343a5] px-5 py-2.5 font-sans text-sm font-semibold text-white"
          >
            Visit project
          </a>
        )}
      </div>

      {credits.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wide text-[#3343a5]">
            Credits
          </h2>
          <ul className="flex flex-wrap gap-2">
            {credits.map((name) => (
              <li
                key={name}
                className="rounded-full border border-[#3343a5]/25 bg-[#eef0ff] px-3 py-1 font-sans text-xs text-[#131626] md:text-sm"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {gallery.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="font-sans text-xl font-medium text-[#131626]">Gallery</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative aspect-4/3 w-full overflow-hidden rounded-[12px] bg-[#eef0ff]"
              >
                <img
                  src={url}
                  alt={`${project.title} image ${index + 1}`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
