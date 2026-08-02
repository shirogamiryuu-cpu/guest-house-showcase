import type { Metadata } from "next"
import { MerchandisePage } from "@/features/merchandise"

export const metadata: Metadata = {
  title: "Merchandise Booths | YOUTHs",
  description:
    "Find YOUTHs merchandise booths: dates, opening hours, items on sale and an interactive map of each location.",
}

export default function MerchandiseRoute() {
  return <MerchandisePage />
}
