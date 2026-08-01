export interface Stat {
  value: string
  label: string
}

export interface WhoWeAreFeature {
  icon: string
  title: string
  description: string
}

export interface UpcomingEvent {
  title: string
  description: string
}

export interface WhoWeAreSectionProps {
  features: WhoWeAreFeature[]
  events: UpcomingEvent[]
  eyebrow?: string
  title?: string
  description?: string
  ctaLabel?: string
  eventsTitle?: string
}

export interface StatCounterProps {
  stat: Stat
}

export interface StatsBarProps {
  stats: Stat[]
}
