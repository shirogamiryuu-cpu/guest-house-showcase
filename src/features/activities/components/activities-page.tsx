import { PastActivitiesSection } from "./past-activities-section"
import { UpcomingActivitiesSection } from "./upcoming-activities-section"
import { pastActivities, upcomingActivities } from "../utils/utils"

export function ActivitiesPage() {
  return (
    <div className="min-h-screen">
      <PastActivitiesSection activities={pastActivities} />
      <UpcomingActivitiesSection activities={upcomingActivities} />
    </div>
  )
}
