"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { figmaImages } from "../utils/utils"

export function ProjectsSection() {
  const [current, setCurrent] = useState(0)
  const duplicated = [...figmaImages, ...figmaImages]

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % figmaImages.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + figmaImages.length) % figmaImages.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="overflow-hidden bg-[#eef0ff] px-4 py-7.5 md:px-8 lg:pl-21.25">
      {/* Title + Arrows */}
      <div className="mb-7.5 flex items-center justify-between pr-4 md:pr-8 lg:pr-21.25">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-sans text-2xl font-medium text-black md:text-3xl lg:text-4xl"
        >
          Projects Published
        </motion.h2>

        {/* Nav Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous project"
            className="flex size-10 items-center justify-center rounded-full bg-white/80 text-[#131626] shadow transition-colors hover:bg-white md:size-12"
          >
            <ChevronLeft className="size-5 md:size-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next project"
            className="flex size-10 items-center justify-center rounded-full bg-white/80 text-[#131626] shadow transition-colors hover:bg-white md:size-12"
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
          {duplicated.map((src, i) => (
            <div
              key={i}
              className="w-[66.666%] shrink-0 px-2 md:w-[50%] md:px-3 lg:w-[33.333%] lg:px-4 xl:w-[25%]"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-[15px] shadow-[0_4px_3.5px_rgba(19,22,38,1)]">
                <img
                  src={src}
                  alt={`Project ${(i % figmaImages.length) + 1}`}
                  className="absolute inset-0 size-full object-cover opacity-90"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 md:p-5">
                  <span className="font-sans text-sm font-extralight text-[#eef0ff] drop-shadow-[0_4px_3.5px_rgba(0,0,0,0.25)] md:text-xl">
                    Register Now!
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {figmaImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to project ${i + 1}`}
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
