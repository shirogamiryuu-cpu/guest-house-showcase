"use client"

import { motion } from "framer-motion"
import { figmaImages } from "../utils/utils"

export function SoftwareHeroSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-52 w-full overflow-hidden sm:h-64 md:h-85"
      >
        <img
          src={figmaImages[0]}
          alt="Software hero"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#3343a5]/40 to-[#5a67d8]/30" />
      </motion.div>
    </section>
  )
}
