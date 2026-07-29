import type { Stat, WhoWeAreFeature, UpcomingEvent } from "../types/type"

export const figmaImages = [
  "/Bwtnd.png",
  "/Y6kHUB.png",
  "/a5m3q8.png",
  "/aRiz0.png",
] as const

export const stats: Stat[] = [
  { value: "30+", label: "Members" },
  { value: "30+", label: "Events" },
  { value: "30+", label: "Projects" },
  { value: "30+", label: "Achievements" },
]

export const whoWeAreFeatures: WhoWeAreFeature[] = [
  { icon: "Globe", title: "Skill Development", description: "Access training programs to level up your skills" },
  { icon: "Users", title: "Collaborative Projects", description: "Join forces with others to solve problems and create impact" },
  { icon: "Award", title: "Leadership", description: "Lead initiatives and grow as future leaders" },
  { icon: "Heart", title: "Community Impacts", description: "Contribute to change through meaningful actions" },
]

export const upcomingEvents: UpcomingEvent[] = [
  { title: "Youth Leadership Summit", description: "A weekend of workshops and networking" },
  { title: "Community Hackathon", description: "Build solutions for local challenges" },
]
