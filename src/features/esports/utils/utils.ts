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
      "The YOUTHs Games & eSports Department brings young people together through gaming, competitions, and community activities. We organize gaming events and tournaments, support competitive gaming, create opportunities for players and organizers, and build a positive community where members can develop teamwork, communication, strategy, and leadership skills.",
    imageSide: "left",
    imageSrc: figmaImages[0],
  },
  {
    title: "Join Our Gaming Community",
    description:
      "Whether you're a competitive player, casual gamer, content creator, tournament organizer, commentator, designer, or simply passionate about gaming, there's a place for you at YOUTHs. Connect with other gamers, participate in events, form teams, and contribute to the growth of our gaming community.",
    imageSide: "right",
    imageSrc: figmaImages[1],
  },
]
