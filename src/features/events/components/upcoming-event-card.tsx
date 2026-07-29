"use client"

import { motion } from "framer-motion"
import type { UpcomingEvent } from "../types/type"

export function UpcomingEventCard({ event }: { event: UpcomingEvent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-none shadow-[0px_4px_4px_0px_#131626]"
    >
      <img
        src={event.image}
        alt={event.title}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <p className="font-sans text-lg font-normal leading-[1.2] text-[#eef0ff] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          {event.title}
        </p>
        <button className="mt-3 rounded-[15px] bg-[#3343a5] px-5.5 py-2.5 font-mono text-sm font-light text-white transition-opacity hover:opacity-80">
          Register Now
        </button>
      </div>
    </motion.div>
  )
}
