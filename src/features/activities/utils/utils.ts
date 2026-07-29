import type { PastActivity, UpcomingActivity } from "../types/type"

const figmaImages = [
  "/Bwtnd.png",
  "/Y6kHUB.png",
  "/a5m3q8.png",
  "/aRiz0.png",
] as const

export const pastActivities: PastActivity[] = [
  { title: "First Event Hosted", imageSrc: figmaImages[0], alt: "First event" },
  { title: "First Event Hosted", imageSrc: figmaImages[1], alt: "First event" },
  { title: "First Event Hosted", imageSrc: figmaImages[2], alt: "First event" },
  { title: "First Event Hosted", imageSrc: figmaImages[3], alt: "First event" },
]

export const upcomingActivities: UpcomingActivity[] = [
  { title: "Register Now!", imageSrc: figmaImages[0], alt: "Upcoming activity" },
  { title: "Register Now!", imageSrc: figmaImages[1], alt: "Upcoming activity" },
  { title: "Register Now!", imageSrc: figmaImages[2], alt: "Upcoming activity" },
  { title: "Register Now!", imageSrc: figmaImages[3], alt: "Upcoming activity" },
]
