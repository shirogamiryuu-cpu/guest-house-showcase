"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { UpcomingActivitiesSectionProps } from "../types/type"

export function UpcomingActivitiesSection({
  activities,
  title = "Upcoming Activities",
  registerLabel = "Register Now",
}: UpcomingActivitiesSectionProps) {
  const [current, setCurrent] = useState(0)
  const duplicated = [...activities, ...activities]

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % activities.length)
  }, [activities.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + activities.length) % activities.length)
  }, [activities.length])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="overflow-hidden bg-white px-4 py-7.5 md:px-8 lg:pl-21.25">
      {/* Title + Arrows */}
      <div className="mb-7.5 flex items-center justify-between pr-4 md:pr-8 lg:pr-21.25">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-linear-to-r from-[#3343a5] to-[#131a3f] bg-clip-text font-sans text-2xl font-medium leading-[1.2] text-transparent md:text-3xl lg:text-4xl"
        >
          {title}
        </motion.h2>

        {/* Nav Arrows */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous activity"
            className="flex size-10 items-center justify-center rounded-full bg-[#eef0ff] text-[#3343a5] shadow transition-colors hover:bg-[#3343a5]/15 md:size-12"
          >
            <ChevronLeft className="size-5 md:size-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next activity"
            className="flex size-10 items-center justify-center rounded-full bg-[#eef0ff] text-[#3343a5] shadow transition-colors hover:bg-[#3343a5]/15 md:size-12"
          >
            <ChevronRight className="size-5 md:size-6" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * (100 / 1.5)}%)` }}
        >
          {duplicated.map((activity, i) => (
            <div
              key={i}
              className="w-[66.666%] shrink-0 px-2 md:w-[50%] md:px-3 lg:w-[33.333%] lg:px-4 xl:w-[25%]"
            >
              <div className="group relative aspect-4/3 overflow-hidden rounded-[15px] shadow-[0_4px_3.5px_rgba(19,22,38,1)]">
                <img
                  src={activity.imageSrc}
                  alt={activity.alt}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-[#3343a5]/30 to-[#5a67d8]/20 opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 md:p-5">
                  <button className="rounded-[15px] bg-[#3343a5] px-4 py-2 font-mono text-xs font-light text-white transition-opacity hover:opacity-80 md:px-5.5 md:py-2.5 md:text-sm">
                    {registerLabel}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {activities.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to activity ${i + 1}`}
              className={`size-2 rounded-full transition-all md:size-3 ${
                i === current ? "w-6 bg-[#3343a5] md:w-8" : "bg-[#3343a5]/30"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
