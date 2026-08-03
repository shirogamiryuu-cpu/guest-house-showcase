"use client"

import { AboutHeroSection } from "./about-hero-section"
import { MiddleQuoteSection } from "./middle-quote-section"
import { MissionVisionValues } from "./mission-vision-values"
import { GrowSection } from "./grow-section"
import { useSiteContent } from "@/integrations/supabase/use-content"
import { contentList, contentValue } from "@/integrations/supabase/content-schema"
import type { MissionVisionData } from "../types/type"

export function AboutPage() {
  const { data: content } = useSiteContent()

  const missionVision: MissionVisionData[] = [
    {
      title: contentValue(content, "about_mission_title"),
      description: contentValue(content, "about_mission_text"),
      icon: "book",
    },
    {
      title: contentValue(content, "about_vision_title"),
      description: contentValue(content, "about_vision_text"),
      icon: "keyboard",
    },
    {
      title: contentValue(content, "about_values_title"),
      description: "",
      icon: "dollar",
    },
  ]

  const values = contentList(content, "about_values_list").map((label) => ({ label }))

  return (
    <div className="min-h-screen bg-[#eef0ff]">
      <AboutHeroSection
        heading={contentValue(content, "about_title")}
        paragraph1={contentValue(content, "about_paragraph1")}
        paragraph2={contentValue(content, "about_paragraph2")}
        image={contentValue(content, "about_image_url")}
      />
      <MiddleQuoteSection words={contentList(content, "about_quote_words")} />
      <MissionVisionValues missionVision={missionVision} values={values} />
      <GrowSection
        heading1={contentValue(content, "about_grow_heading1")}
        heading2={contentValue(content, "about_grow_heading2")}
        description={contentValue(content, "about_grow_description")}
        image={contentValue(content, "about_grow_image_url")}
      />
    </div>
  )
}
