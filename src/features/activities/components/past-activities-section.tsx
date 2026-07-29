"use client"

import { motion } from "framer-motion"
import type { PastActivitiesSectionProps } from "../types/type"

export function PastActivitiesSection({ activities }: PastActivitiesSectionProps) {
  return (
    <section className="bg-linear-to-b from-[#131626] to-[#3343a5] px-4 py-7.5 md:px-8 lg:px-21.25">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-7.5 font-sans text-2xl font-medium leading-[1.2] text-[#eef0ff] md:mb-15 md:text-3xl lg:text-4xl"
      >
        Past Activities
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto grid max-w-360 grid-cols-1 gap-5 md:grid-cols-2 md:gap-8"
      >
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
            className="group relative overflow-hidden rounded-[15px] shadow-[0_4px_3.5px_rgba(19,22,38,1)]"
          >
            <div className="relative aspect-620/443.5 w-full overflow-hidden">
              <img
                src={activity.imageSrc}
                alt={activity.alt}
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-br from-[#3343a5]/40 to-[#5a67d8]/30" />
            </div>

            {/* Title overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-4 md:p-6">
              <h3 className="font-sans text-base font-medium text-[#eef0ff] md:text-xl lg:text-2xl">
                {activity.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
