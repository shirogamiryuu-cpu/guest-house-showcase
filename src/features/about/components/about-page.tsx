import { AboutHeroSection } from "./about-hero-section"
import { MiddleQuoteSection } from "./middle-quote-section"
import { MissionVisionValues } from "./mission-vision-values"
import { GrowSection } from "./grow-section"
import { missionVisionData, valuesList } from "../utils/utils"

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#eef0ff]">
      <AboutHeroSection />
      <MiddleQuoteSection />
      <MissionVisionValues missionVision={missionVisionData} values={valuesList} />
      <GrowSection />
    </div>
  )
}
