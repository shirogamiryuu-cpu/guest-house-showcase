"use client"

import { motion } from "framer-motion"
import { growSectionData, figmaImages } from "../utils/utils"

export function GrowSection() {
  return (
    <section className="relative h-100 w-full overflow-hidden md:h-120">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 size-full overflow-hidden"
      >
        <img
          src={figmaImages[1]}
          alt="Learn & Grow"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#3343a5]/40 to-[#5a67d8]/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto flex h-full max-w-360 flex-col justify-center gap-2 px-5 md:px-8 lg:pl-16 lg:pr-0"
      >
        <h2 className="max-w-96 font-sans text-3xl font-extrabold leading-[1.2] text-white drop-shadow-sm sm:text-4xl md:text-5xl">
          {growSectionData.heading1}
        </h2>
        <h2 className="max-w-96 font-sans text-3xl font-extrabold leading-[1.2] text-white drop-shadow-sm sm:text-4xl md:text-5xl">
          {growSectionData.heading2}
        </h2>
        <p className="max-w-96 font-sans text-base font-light leading-relaxed text-white drop-shadow-sm md:text-lg">
          {growSectionData.description}
        </p>
      </motion.div>
    </section>
  )
}
