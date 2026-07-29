import type { Event, UpcomingEvent } from "../types/type"

export const eventImages = [
  "/Bwtnd.png",
  "/Y6kHUB.png",
  "/a5m3q8.png",
  "/aRiz0.png",
] as const

export const events: Event[] = [0, 1, 2, 3].map((imgIdx) => ({
  id: imgIdx + 1,
  image: eventImages[imgIdx % eventImages.length],
  title: "First Event Hosted",
}))

export const upcomingEvents: UpcomingEvent[] = [
  { id: 1, image: eventImages[0], title: "Youth Summit 2026" },
  { id: 2, image: eventImages[1], title: "Community Outreach Day" },
  { id: 3, image: eventImages[2], title: "Leadership Workshop" },
]
