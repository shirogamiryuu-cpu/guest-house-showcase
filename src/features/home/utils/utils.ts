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
  {
    icon: "Globe",
    title: "Skill Development",
    description: "Build practical skills through training, workshops, and hands-on experiences",
  },
  {
    icon: "Users",
    title: "Collaboration",
    description: "Connect with young people and work together on meaningful projects",
  },
  {
    icon: "Award",
    title: "Leadership",
    description: "Take responsibility, lead initiatives, and grow as future leaders",
  },
  {
    icon: "Heart",
    title: "Community Impact",
    description: "Turn your skills and ideas into actions that create positive change",
  },
]

export const upcomingEvents: UpcomingEvent[] = [
  { title: "Youth Leadership Summit", description: "A weekend of workshops and networking" },
  { title: "Community Hackathon", description: "Build solutions for local challenges" },
]
