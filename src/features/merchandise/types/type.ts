export interface LeadCard {
  title: string
  description: string
  imageSide: "left" | "right"
  imageSrc: string
}

export interface LeadCardProps {
  card: LeadCard
  index: number
}

export interface LeadsSectionProps {
  cards: LeadCard[]
}

export interface Booth {
  title: string
  imageSrc: string
}

export interface FeaturedBooth extends Booth {
  date: string
  hours: string
  sellingItems: string
}

export interface UpcomingBoothsSectionProps {
  booths: Booth[]
  mapTitle: string
  mapAddress: string
  mapQuery: string
}
