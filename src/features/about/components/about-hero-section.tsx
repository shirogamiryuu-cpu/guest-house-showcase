"use client"

import { motion } from "framer-motion"

interface AboutHeroSectionProps {
  heading: string
  paragraph1: string
  paragraph2: string
  image: string
}

export function AboutHeroSection({
  heading,
  paragraph1,
  paragraph2,
  image,
}: AboutHeroSectionProps) {
  return (
    <section className="mx-auto flex max-w-360 flex-col items-start gap-5 px-5 py-8 md:px-8 md:py-10 lg:flex-row lg:px-21.25">
      {/* Left — Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-1 flex-col gap-4"
      >
        <h1 className="w-full bg-linear-to-r from-[#131a3f] to-[#3244a5] bg-clip-text font-sans text-3xl font-semibold leading-[1.2] text-transparent drop-shadow-sm sm:text-4xl md:text-5xl">
          {heading}
        </h1>
        <p className="w-full font-sans text-base font-light leading-relaxed text-[#3343a5]">
          {paragraph1}
        </p>
        <p className="w-full font-sans text-lg font-light leading-relaxed text-[#3343a5]">
          {paragraph2}
        </p>
      </motion.div>

      {/* Right — Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-[15px] shadow-[0_4px_3.5px_#00000040] lg:h-80 lg:w-140 lg:aspect-auto"
      >
        <img
          src={image || "/Bwtnd.png"}
          alt="About YOUTHs"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#3343a5]/30 to-[#5a67d8]/20" />
      </motion.div>
    </section>
  )
}
