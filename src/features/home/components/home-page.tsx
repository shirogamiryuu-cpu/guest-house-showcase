import { HeroSection } from "./hero-section"
import { StatsBar } from "./stats-bar"
import { WhoWeAreSection } from "./who-we-are-section"
import { ProjectsSection } from "./projects-section"
import { stats, whoWeAreFeatures, upcomingEvents } from "../utils/utils"

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsBar stats={stats} />
      <WhoWeAreSection features={whoWeAreFeatures} events={upcomingEvents} />
      <ProjectsSection />
    </div>
  )
}
