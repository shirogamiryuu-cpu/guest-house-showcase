"use client"

import { PastActivitiesSection } from "./past-activities-section"
import { UpcomingActivitiesSection } from "./upcoming-activities-section"
import { useActivities } from "@/features/content/use-content"

export function ActivitiesPage() {
  const { data: past } = useActivities("past")
  const { data: upcoming } = useActivities("upcoming")

  return (
    <div className="min-h-screen">
      <PastActivitiesSection
        activities={past.map((a) => ({
          title: a.title,
          imageSrc: a.image_url || "/Bwtnd.png",
          alt: a.title,
        }))}
      />
      <UpcomingActivitiesSection
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
