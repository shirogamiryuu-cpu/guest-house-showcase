"use client"

import { HeroSection } from "./hero-section"
import { StatsBar } from "./stats-bar"
import { WhoWeAreSection } from "./who-we-are-section"
import { ProjectsSection } from "./projects-section"
import { whoWeAreFeatures } from "../utils/utils"
import { useEvents, useProjects, useSiteContent, useStats } from "@/features/content/use-content"

export function HomePage() {
  const { data: stats } = useStats()
  const { data: content } = useSiteContent()
  const { data: projects } = useProjects()
  const { data: events } = useEvents()

  return (
    <div className="min-h-screen bg-white">
      <HeroSection content={content} />
      <StatsBar stats={stats.map((s) => ({ value: s.value, label: s.label }))} />
      <WhoWeAreSection
        features={whoWeAreFeatures}
        events={events.map((e) => ({ title: e.title, description: e.description }))}
      />
      <ProjectsSection projects={projects} />
    </div>
  )
}
