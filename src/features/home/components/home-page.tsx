"use client"

import { HeroSection } from "./hero-section"
import { StatsBar } from "./stats-bar"
import { WhoWeAreSection } from "./who-we-are-section"
import { ProjectsSection } from "./projects-section"
import { useEvents, useProjects, useSiteContent, useStats } from "@/features/content/use-content"
import { contentValue } from "@/features/content/content-schema"

const FEATURE_ICONS = ["Globe", "Users", "Award", "Heart"]

export function HomePage() {
  const { data: stats } = useStats()
  const { data: content } = useSiteContent()
  const { data: projects } = useProjects()
  const { data: events } = useEvents()

  const features = FEATURE_ICONS.map((icon, i) => ({
    icon,
    title: contentValue(content, `home_feature${i + 1}_title`),
    description: contentValue(content, `home_feature${i + 1}_description`),
  }))

  return (
    <div className="min-h-screen bg-white">
      <HeroSection content={content} />
      <StatsBar stats={stats.map((s) => ({ value: s.value, label: s.label }))} />
      <WhoWeAreSection
        features={features}
        events={events.map((e) => ({ title: e.title, description: e.description }))}
        eyebrow={contentValue(content, "home_who_eyebrow")}
        title={contentValue(content, "home_who_title")}
        description={contentValue(content, "home_who_description")}
        ctaLabel={contentValue(content, "home_who_cta_label")}
        eventsTitle={contentValue(content, "home_events_title")}
      />
      <ProjectsSection projects={projects} title={contentValue(content, "home_projects_title")} />
    </div>
  )
}
