export interface PastActivity {
  title: string
  imageSrc: string
  alt: string
}

export interface UpcomingActivity {
  title: string
  imageSrc: string
  alt: string
}

export interface PastActivitiesSectionProps {
  activities: PastActivity[]
}

export interface UpcomingActivitiesSectionProps {
  activities: UpcomingActivity[]
}
