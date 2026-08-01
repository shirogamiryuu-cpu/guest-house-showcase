export interface PastActivity {
  title: string
  imageSrc: string
  alt: string
}

export interface UpcomingActivity {
  title: string
  imageSrc: string
  alt: string
  registerUrl?: string
}

export interface PastActivitiesSectionProps {
  activities: PastActivity[]
  title?: string
}

export interface UpcomingActivitiesSectionProps {
  activities: UpcomingActivity[]
  title?: string
  registerLabel?: string
}
