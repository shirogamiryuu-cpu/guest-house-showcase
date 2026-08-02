"use client"

import { motion } from "framer-motion"
import type { UpcomingBoothsSectionProps } from "../types/type"

export function UpcomingBoothsSection({ booths, featured }: UpcomingBoothsSectionProps) {
  return (
    <section className="px-5 py-10 md:px-8 md:py-14 lg:px-21.25 lg:py-20">
      <div className="mx-auto flex max-w-360 flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        {/* Left — Heading + booth list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-1 flex-col gap-6"
        >
          <h2 className="bg-linear-to-r from-[#3343a5] to-[#131a3f] bg-clip-text font-serif text-3xl font-bold leading-[1.2] text-transparent drop-shadow-sm md:text-4xl lg:text-5xl">
            Upcoming Booths
          </h2>

          <div className="flex flex-col gap-4">
            {booths.map((booth) => (
              <div
                key={booth.title}
                className="flex items-center gap-4 rounded-[15px] bg-[#131a3f] p-4 shadow-[0_4px_3.5px_rgba(0,0,0,0.25)]"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-[5px] bg-[#d9d9d9]">
                  <img
                    src={booth.imageSrc}
                    alt={booth.title}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-lg font-normal text-white md:text-xl">
                    {booth.title}
                  </h3>
                  <button className="w-fit font-serif text-sm text-white/80 transition-opacity hover:opacity-70">
                    See more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Featured booth */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="w-full shrink-0 overflow-hidden rounded-[15px] bg-[#131a3f] lg:w-135"
        >
          <div className="relative aspect-16/9">
            <img
              src={featured.imageSrc}
              alt={featured.title}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 p-6">
            <p className="font-serif text-lg font-light text-white md:text-xl">{featured.date}</p>
            <p className="font-serif text-lg font-light text-white md:text-xl">{featured.hours}</p>
            <p className="font-serif text-lg font-light text-white md:text-xl">{featured.sellingItems}</p>
          </div>
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-14 bg-linear-to-r from-[#131a3f] via-[#243176] to-[#00a5eb] bg-clip-text text-center font-serif text-3xl leading-[1.2] text-transparent drop-shadow-sm sm:text-4xl md:mt-20 md:text-5xl lg:text-6xl"
      >
        Come Join Us Anytime!
      </motion.h2>
    </section>
  )
}
