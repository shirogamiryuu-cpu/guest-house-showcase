import { EsportsHeroSection } from "./esports-hero-section"
import { LeadsSection } from "./leads-section"
import { GamesSection } from "./games-section"
import { leadCards } from "../utils/utils"

export function EsportsPage() {
  return (
    <div className="min-h-screen bg-[#eef0ff]">
      <EsportsHeroSection />
      <LeadsSection cards={leadCards} />
      <GamesSection />
    </div>
  )
}
