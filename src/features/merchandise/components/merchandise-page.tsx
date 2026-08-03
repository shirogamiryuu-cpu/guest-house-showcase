"use client"

import { MerchandiseHeroSection } from "./merchandise-hero-section"
import { LeadsSection } from "./leads-section"
import { UpcomingBoothsSection } from "./upcoming-booths-section"
import { leadCards, booths as fallbackBooths } from "../utils/utils"
import { useMerchBooths, useSiteContent } from "@/features/content/use-content"
import { contentValue } from "@/features/content/content-schema"

export function MerchandisePage() {
  const { data: rows } = useMerchBooths()
  const { data: content } = useSiteContent()

  const booths = rows.length
    ? rows.map((r) => ({ title: r.title, imageSrc: r.image_url || "/Bwtnd.png" }))
    : fallbackBooths

  return (
    <div className="min-h-screen bg-[#eef0ff]">
      <MerchandiseHeroSection />
      <LeadsSection cards={leadCards} />
      <UpcomingBoothsSection
        booths={booths}
        mapTitle={contentValue(content, "merch_map_title")}
        mapAddress={contentValue(content, "merch_map_address")}
        mapQuery={contentValue(content, "merch_map_query")}
      />
    </div>
  )
}
