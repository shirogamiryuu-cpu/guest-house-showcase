import { SoftwareHeroSection } from "./software-hero-section"
import { LeadsSection } from "./leads-section"
import { RelatedProjectsSection } from "./related-projects-section"
import { leadCards } from "../utils/utils"

export function SoftwarePage() {
  return (
    <div className="min-h-screen bg-[#eef0ff]">
      <SoftwareHeroSection />
      <LeadsSection cards={leadCards} />
      <RelatedProjectsSection />
    </div>
  )
}
