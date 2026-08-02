import type { LeadCard, Booth, FeaturedBooth } from "../types/type"

export const figmaImages = [
  "/Bwtnd.png",
  "/Y6kHUB.png",
  "/a5m3q8.png",
  "/aRiz0.png",
] as const

export const leadCards: LeadCard[] = [
  {
    title: "What Will We Do?",
    description:
      "The YOUTHs Merchandise Department creates and provides products that represent our community, support our activities, and give young people opportunities to explore creativity, product design, marketing, and entrepreneurship. Our merchandise includes clothing, accessories, stickers, and other YOUTHs products.",
    imageSide: "right",
    imageSrc: figmaImages[0],
  },
  {
    title: "How Will We Do It?",
    description:
      "We develop merchandise by identifying what our community needs, designing products, planning production, managing orders, and promoting them through our online store and physical booths. Members work together across design, marketing, finance, and operations to bring each product from an idea to customers.",
    imageSide: "left",
    imageSrc: figmaImages[1],
  },
]

export const booths: Booth[] = [
  { title: "Uit Fresher Welcome", imageSrc: figmaImages[2] },
  { title: "YTU Anniversary", imageSrc: figmaImages[3] },
  { title: "YU Farewell", imageSrc: figmaImages[0] },
]

export const featuredBooth: FeaturedBooth = {
  title: "Uit Fresher Welcome",
  imageSrc: figmaImages[2],
  date: "Date: 08-05-2026",
  hours: "Available Hours: 7:00 AM - 1:00 PM",
  sellingItems: "Selling Items: T-Shirts, Hoodies, Stickers",
}
