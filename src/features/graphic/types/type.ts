export interface LeadCard {
  title: string
  description: string
  imageSide: "left" | "right"
  imageSrc: string
}

export interface ProjectCard {
  title: string
}

export interface LeadCardRowProps {
  card: LeadCard
  index: number
}

export interface LeadsSectionProps {
  cards: LeadCard[]
}
