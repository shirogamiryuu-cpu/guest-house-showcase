import { MerchandiseHeroSection } from "./merchandise-hero-section"
import { LeadsSection } from "./leads-section"
import { UpcomingBoothsSection } from "./upcoming-booths-section"
import { leadCards, booths, featuredBooth } from "../utils/utils"

export function MerchandisePage() {
  return (
    <div className="min-h-screen bg-[#eef0ff]">
      <MerchandiseHeroSection />
      <LeadsSection cards={leadCards} />
      <UpcomingBoothsSection booths={booths} featured={featuredBooth} />
    </div>
  )
}
