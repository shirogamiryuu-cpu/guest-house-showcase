import { GraphicHeroSection } from "./graphic-hero-section"
import { LeadsSection } from "./leads-section"
import { RelatedProjectsSection } from "./related-projects-section"
import { leadCards } from "../utils/utils"

export function GraphicPage() {
  return (
    <div className="min-h-screen bg-[#eef0ff]">
      <GraphicHeroSection />
      <LeadsSection cards={leadCards} />
      <RelatedProjectsSection />
    </div>
  )
}
