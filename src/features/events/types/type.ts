export interface Event {
  id: number
  image: string
  title: string
}

export interface UpcomingEvent {
  id: number
  image: string
  title: string
}

export interface EventCardProps {
  event: Event
}

export interface UpcomingEventCardProps {
  event: UpcomingEvent
}

export interface UpcomingEventsSectionProps {
  events: UpcomingEvent[]
}

export interface EventsPageProps {
  projects: Event[]
  events: UpcomingEvent[]
}
