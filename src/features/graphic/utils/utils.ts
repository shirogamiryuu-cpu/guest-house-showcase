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
      "The YOUTHs Graphic Design Department creates visual content that helps ideas, projects, and organizations communicate effectively. We work on branding, social media graphics, posters, promotional materials, illustrations, UI designs, and other creative projects while giving young designers opportunities to build practical skills and portfolios.",
    imageSide: "left",
    imageSrc: figmaImages[0],
  },
  {
    title: "How Will We Do It?",
    description:
      "We turn ideas into strong visual designs through a collaborative creative process. We begin by understanding the purpose and audience, develop concepts and visual directions, create and refine designs, gather feedback, and deliver polished work ready for digital or print use. Members learn by working on real projects and collaborating with other departments.",
    imageSide: "right",
    imageSrc: figmaImages[1],
  },
]

export const relatedProjects = Array.from({ length: 4 }, (_, i) => ({
  title: `Project ${i + 1}`,
}))
