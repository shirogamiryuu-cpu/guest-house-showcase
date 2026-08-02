import type { LeadCard } from "../types/type"

export const figmaImages = [
  "/Bwtnd.png",
  "/Y6kHUB.png",
  "/a5m3q8.png",
  "/aRiz0.png",
] as const

export const leadCards: LeadCard[] = [
  {
    title: "What Will We Do?",
    description:
      "The YOUTHs Software Development Department builds practical digital solutions while giving young people opportunities to develop real-world technical skills. We work on websites, web applications, mobile applications, custom software, AI-powered solutions, and other technology projects that solve real problems.",
    imageSide: "left",
    imageSrc: figmaImages[0],
  },
  {
    title: "How Will We Do It?",
    description:
      "We turn ideas into working solutions through a collaborative development process. We begin by understanding the problem, plan the solution, design the user experience, develop and test the product, then deploy and continuously improve it. Members work together across different roles while gaining hands-on experience.",
    imageSide: "right",
    imageSrc: figmaImages[1],
  },
]

export const relatedProjects = Array.from({ length: 4 }, (_, i) => ({
  title: `Project ${i + 1}`,
}))
