export type ContentFieldType = "text" | "textarea" | "image" | "list"

export interface ContentField {
  key: string
  label: string
  type?: ContentFieldType
  help?: string
}

export interface ContentGroup {
  title: string
  fields: ContentField[]
}

/** Every editable text/image on the public site, with its default value. */
export const CONTENT_DEFAULTS: Record<string, string> = {
  // Home — hero
  hero_title: "Building Today, Inspiring Tomorrow",
  hero_subtitle:
    "We connect talented youths with meaningful opportunities to learn, build and grow together.",
  hero_cta_label: "Register Now",
  hero_image_url: "/Bwtnd.png",

  // Home — who we are
  home_who_eyebrow: "WHO WE ARE",
  home_who_title: "Empowering Youths Through Actions",
  home_who_description:
    "We create space for young people to build real skills through collaboration, mentorship and hands-on projects.",
  home_who_cta_label: "Learn More",
  home_feature1_title: "Skill Development",
  home_feature1_description: "Access training programs to level up your skills",
  home_feature2_title: "Collaborative Projects",
  home_feature2_description: "Join forces with others to solve problems and create impact",
  home_feature3_title: "Leadership",
  home_feature3_description: "Lead initiatives and grow as future leaders",
  home_feature4_title: "Community Impacts",
  home_feature4_description: "Contribute to change through meaningful actions",
  home_events_title: "Upcoming Events",
  home_projects_title: "Our Projects",

  // About
  about_title: "About YOUTHs",
  about_paragraph1:
    "YOUTHs is a youth-driven community turning creativity and ambition into real opportunities.",
  about_paragraph2:
    "We bring together designers, developers and organisers to deliver professional work while learning from each other.",
  about_image_url: "/Bwtnd.png",
  about_quote_words: "LEARN, BUILD, COLLABORATE, EARN",
  about_mission_title: "Our Mission",
  about_mission_text:
    "To empower talented youth by connecting them with meaningful opportunities, delivering professional digital and creative services, and fostering growth through collaboration, technology, and fair recognition.",
  about_vision_title: "Our Vision",
  about_vision_text:
    "To become a globally recognized youth-driven talent ecosystem that transforms creativity and innovation into sustainable opportunities and positive impact.",
  about_values_title: "Our Values",
  about_values_list:
    "Respect Clients & Commitments, Real Skills Building, Responsibility, Collaboration, Innovation, Integrity, Fairness, Quality, Growth",
  about_grow_heading1: "Learn & Grow",
  about_grow_heading2: "With YOUTHs",
  about_grow_description:
    "Join workshops, real client projects and a community that helps you level up every month.",
  about_grow_image_url: "/Y6kHUB.png",

  // Activities
  activities_past_title: "Past Activities",
  activities_upcoming_title: "Upcoming Activities",
  activities_register_label: "Register Now",

  // Events
  events_upcoming_title: "Upcoming Events",
}

export const CONTENT_GROUPS: ContentGroup[] = [
  {
    title: "Home — Hero",
    fields: [
      { key: "hero_title", label: "Heading" },
      { key: "hero_subtitle", label: "Subtitle", type: "textarea" },
      { key: "hero_cta_label", label: "Button label" },
      { key: "hero_image_url", label: "Hero image", type: "image" },
    ],
  },
  {
    title: "Home — Who we are",
    fields: [
      { key: "home_who_eyebrow", label: "Small label above heading" },
      { key: "home_who_title", label: "Heading" },
      { key: "home_who_description", label: "Paragraph", type: "textarea" },
      { key: "home_who_cta_label", label: "Button label" },
      { key: "home_feature1_title", label: "Feature 1 — title" },
      { key: "home_feature1_description", label: "Feature 1 — description" },
      { key: "home_feature2_title", label: "Feature 2 — title" },
      { key: "home_feature2_description", label: "Feature 2 — description" },
      { key: "home_feature3_title", label: "Feature 3 — title" },
      { key: "home_feature3_description", label: "Feature 3 — description" },
      { key: "home_feature4_title", label: "Feature 4 — title" },
      { key: "home_feature4_description", label: "Feature 4 — description" },
      { key: "home_events_title", label: "Upcoming events box title" },
      { key: "home_projects_title", label: "Projects section title" },
    ],
  },
  {
    title: "About page",
    fields: [
      { key: "about_title", label: "Heading" },
      { key: "about_paragraph1", label: "Paragraph 1", type: "textarea" },
      { key: "about_paragraph2", label: "Paragraph 2", type: "textarea" },
      { key: "about_image_url", label: "Header image", type: "image" },
      {
        key: "about_quote_words",
        label: "Banner words",
        type: "list",
        help: "Comma separated, shown across the dark banner",
      },
      { key: "about_mission_title", label: "Mission — title" },
      { key: "about_mission_text", label: "Mission — text", type: "textarea" },
      { key: "about_vision_title", label: "Vision — title" },
      { key: "about_vision_text", label: "Vision — text", type: "textarea" },
      { key: "about_values_title", label: "Values — title" },
      { key: "about_values_list", label: "Values — list", type: "list", help: "Comma separated" },
      { key: "about_grow_heading1", label: "Grow banner — line 1" },
      { key: "about_grow_heading2", label: "Grow banner — line 2" },
      { key: "about_grow_description", label: "Grow banner — text", type: "textarea" },
      { key: "about_grow_image_url", label: "Grow banner — image", type: "image" },
    ],
  },
  {
    title: "Activities page",
    fields: [
      { key: "activities_past_title", label: "Past activities heading" },
      { key: "activities_upcoming_title", label: "Upcoming activities heading" },
      { key: "activities_register_label", label: "Register button label" },
    ],
  },
  {
    title: "Events page",
    fields: [{ key: "events_upcoming_title", label: "Upcoming events heading" }],
  },
]

export function contentValue(map: Record<string, string>, key: string): string {
  const v = map[key]
  return v && v.trim() !== "" ? v : (CONTENT_DEFAULTS[key] ?? "")
}

export function contentList(map: Record<string, string>, key: string): string[] {
  return contentValue(map, key)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}
