"use client"

import { motion } from "framer-motion"
import type { UpcomingEventsSectionProps } from "../types/type"
import { UpcomingEventCard } from "./upcoming-event-card"

export function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-360 px-5 md:px-8 lg:px-25"
      >
        <h2 className="font-brand text-2xl font-semibold text-[#3343a5] md:text-[29px]">
          Upcoming Events
        </h2>
      </motion.div>

      <div className="mx-auto mt-6 grid max-w-360 grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:mt-10 md:gap-x-12 md:px-8 lg:grid-cols-3 lg:gap-x-25 lg:px-25">
        {events.map((event) => (
          <UpcomingEventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
