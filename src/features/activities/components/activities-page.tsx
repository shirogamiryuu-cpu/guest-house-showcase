"use client"

import { PastActivitiesSection } from "./past-activities-section"
import { UpcomingActivitiesSection } from "./upcoming-activities-section"
import { useActivities, useSiteContent } from "@/features/content/use-content"
import { contentValue } from "@/features/content/content-schema"

export function ActivitiesPage() {
  const { data: past } = useActivities("past")
  const { data: upcoming } = useActivities("upcoming")
  const { data: content } = useSiteContent()

  return (
    <div className="min-h-screen">
      <PastActivitiesSection
        title={contentValue(content, "activities_past_title")}
        activities={past.map((a) => ({
          title: a.title,
          imageSrc: a.image_url || "/Bwtnd.png",
          alt: a.title,
        }))}
      />
      <UpcomingActivitiesSection
        title={contentValue(content, "activities_upcoming_title")}
        registerLabel={contentValue(content, "activities_register_label")}
        activities={upcoming.map((a) => ({
          title: a.title,
          imageSrc: a.image_url || "/Bwtnd.png",
          alt: a.title,
          registerUrl: a.register_url,
        }))}
      />
    </div>
  )
}
