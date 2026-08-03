"use client"

import { motion } from "framer-motion"
import { UpcomingEventsSection } from "./upcoming-events-section"
import { EventCard } from "./event-card"
import { events, upcomingEvents } from "../utils/utils"
import { useSiteContent } from "@/integrations/supabase/use-content"
import { contentValue } from "@/integrations/supabase/content-schema"

export function EventsPage() {
  const { data: content } = useSiteContent()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-360 px-5 py-8 md:px-8 md:py-10 lg:px-25 lg:py-15">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-25 lg:gap-y-10.75">
          {events.slice(0, 4).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
      <UpcomingEventsSection
        events={upcomingEvents}
        title={contentValue(content, "events_upcoming_title")}
      />
    </div>
  )
}
